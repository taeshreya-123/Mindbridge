import os
import traceback
from pathlib import Path
from typing import Any

import psycopg2
from dotenv import load_dotenv
from fastapi import FastAPI, Header, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from supabase import create_client


BACKEND_DIR = Path(__file__).resolve().parents[1]
load_dotenv(Path(__file__).resolve().parent.parent / ".env")

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_PUBLISHABLE_KEY = os.getenv("SUPABASE_PUBLISHABLE_KEY")
DATABASE_URL = os.getenv("DATABASE_URL")

if not SUPABASE_URL or not SUPABASE_PUBLISHABLE_KEY or not DATABASE_URL:
    raise RuntimeError("Required backend environment variables are missing.")

try:
    SUPABASE_SERVICE_ROLE_KEY = os.environ["SUPABASE_SERVICE_ROLE_KEY"]
except KeyError as error:
    print("SUPABASE_SERVICE_ROLE_KEY is required for Auth user lookup.")
    raise RuntimeError("SUPABASE_SERVICE_ROLE_KEY is required for Auth user lookup.") from error

supabase = create_client(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY)
supabase_admin = create_client(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_origin_regex=r"https://.*\.vercel\.app",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class SignUpRequest(BaseModel):
    password: str = Field(min_length=6)
    full_name: str = Field(min_length=1)
    student_id: str = Field(min_length=1)


class LoginRequest(BaseModel):
    student_id: str = Field(min_length=1)
    password: str = Field(min_length=6)


class CheckInRequest(BaseModel):
    streak_count: int = Field(ge=0)


class MoodRequest(BaseModel):
    mood: int = Field(ge=0, le=100)


class JournalRequest(BaseModel):
    entry_text: str = Field(min_length=1)


def get_connection():
    return psycopg2.connect(DATABASE_URL)


def internal_email(student_id: str) -> str:
    """Create the backend-only Auth identifier for a student."""
    return f"{student_id.strip().lower()}@mindbridge.local"


def session_payload(session: Any, user: Any, full_name: str) -> dict[str, Any]:
    if not session or not session.access_token:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Account created. Please confirm your email before logging in.",
        )
    return {
        "access_token": session.access_token,
        "user": {"id": str(user.id), "full_name": full_name},
    }


def log_exception(context: str, error: Exception) -> None:
    """Write safe exception diagnostics to function logs."""
    print(f"{context} error: {str(error)}")
    print(f"{context} error repr: {repr(error)}")
    print(f"{context} error args: {error.args}")
    print(traceback.format_exc())


def find_auth_user(email: str) -> Any | None:
    """Use the server-only admin client to find an Auth user by email."""
    users = supabase_admin.auth.admin.list_users(per_page=1000)
    return next((user for user in users if user.email and user.email.lower() == email), None)


def profile_name(user_id: str) -> str:
    with get_connection() as connection:
        with connection.cursor() as cursor:
            cursor.execute("SELECT full_name FROM profiles WHERE id = %s", (user_id,))
            profile = cursor.fetchone()

    if not profile:
        raise HTTPException(status_code=404, detail="Your profile could not be found. Please contact support.")
    return profile[0]


def login_existing_user(student_id: str, password: str) -> dict[str, Any]:
    email = internal_email(student_id)
    try:
        if not find_auth_user(email):
            raise HTTPException(status_code=401, detail="User not found")

        try:
            response = supabase.auth.sign_in_with_password({"email": email, "password": password})
        except Exception as error:
            log_exception("Login password verification", error)
            raise HTTPException(status_code=401, detail="Incorrect password. Please try again.") from error

        if not response.user or not response.session:
            raise RuntimeError("Supabase did not return a user session.")

        return session_payload(response.session, response.user, profile_name(str(response.user.id)))
    except HTTPException:
        raise
    except Exception as error:
        log_exception("Login", error)
        raise HTTPException(status_code=500, detail=str(error)) from error


def verify_token(authorization_header: str | None) -> str:
    """Return the Supabase user ID for a valid bearer token."""
    if not authorization_header or not authorization_header.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Please log in to continue.")

    token = authorization_header.removeprefix("Bearer ").strip()
    if not token:
        raise HTTPException(status_code=401, detail="Please log in to continue.")

    try:
        response = supabase.auth.get_user(token)
        if not response.user:
            raise ValueError("No authenticated user")
        return str(response.user.id)
    except Exception as error:
        raise HTTPException(status_code=401, detail="Your session has expired. Please log in again.") from error


@app.get("/api/health")
def health_check() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/api/auth/signup", status_code=status.HTTP_201_CREATED)
def signup(payload: SignUpRequest) -> dict[str, Any]:
    try:
        email = internal_email(payload.student_id)
        if find_auth_user(email):
            return login_existing_user(payload.student_id, payload.password)

        response = supabase.auth.sign_up(
            {
                "email": email,
                "password": payload.password,
                "options": {"data": {"full_name": payload.full_name, "student_id": payload.student_id}},
            }
        )
        if not response.user:
            raise ValueError("No user returned from sign-up")

        with get_connection() as connection:
            with connection.cursor() as cursor:
                cursor.execute(
                    """
                    INSERT INTO profiles (id, full_name, student_id)
                    VALUES (%s, %s, %s)
                    ON CONFLICT (id) DO NOTHING
                    """,
                    (str(response.user.id), payload.full_name, payload.student_id),
                )

        if not response.session:
            response = supabase.auth.sign_in_with_password({"email": email, "password": payload.password})

        return session_payload(response.session, response.user, payload.full_name)
    except HTTPException:
        raise
    except Exception as error:
        log_exception("Signup", error)
        raise HTTPException(status_code=500, detail=str(error)) from error


@app.post("/api/auth/login")
def login(payload: LoginRequest) -> dict[str, Any]:
    return login_existing_user(payload.student_id, payload.password)


@app.post("/api/checkin", status_code=status.HTTP_201_CREATED)
def create_checkin(payload: CheckInRequest, authorization: str | None = Header(default=None)) -> dict[str, Any]:
    user_id = verify_token(authorization)
    with get_connection() as connection:
        with connection.cursor() as cursor:
            cursor.execute(
                "INSERT INTO checkins (user_id, streak_count) VALUES (%s, %s) RETURNING id, streak_count, created_at",
                (user_id, payload.streak_count),
            )
            checkin_id, streak_count, created_at = cursor.fetchone()
    return {"id": str(checkin_id), "streak_count": streak_count, "created_at": created_at.isoformat()}


@app.post("/api/mood", status_code=status.HTTP_201_CREATED)
def create_mood(payload: MoodRequest, authorization: str | None = Header(default=None)) -> dict[str, Any]:
    user_id = verify_token(authorization)
    with get_connection() as connection:
        with connection.cursor() as cursor:
            cursor.execute(
                "INSERT INTO mood_entries (user_id, mood) VALUES (%s, %s) RETURNING id, mood, created_at",
                (user_id, payload.mood),
            )
            mood_id, mood, created_at = cursor.fetchone()
    return {"id": str(mood_id), "mood": mood, "created_at": created_at.isoformat()}


@app.post("/api/journal", status_code=status.HTTP_201_CREATED)
def create_journal(payload: JournalRequest, authorization: str | None = Header(default=None)) -> dict[str, Any]:
    user_id = verify_token(authorization)
    entry_text = payload.entry_text.strip()
    if not entry_text:
        raise HTTPException(status_code=422, detail="Please write a journal entry before submitting.")

    with get_connection() as connection:
        with connection.cursor() as cursor:
            cursor.execute(
                "INSERT INTO journal_entries (user_id, entry_text) VALUES (%s, %s) RETURNING id, entry_text, created_at",
                (user_id, entry_text),
            )
            journal_id, saved_entry, created_at = cursor.fetchone()
    return {"id": str(journal_id), "entry_text": saved_entry, "created_at": created_at.isoformat()}


@app.get("/api/dashboard")
def get_dashboard(authorization: str | None = Header(default=None)) -> dict[str, list[dict[str, Any]]]:
    user_id = verify_token(authorization)
    with get_connection() as connection:
        with connection.cursor() as cursor:
            cursor.execute(
                "SELECT id, mood, created_at FROM mood_entries WHERE user_id = %s ORDER BY created_at DESC LIMIT 4",
                (user_id,),
            )
            mood_entries = [
                {"id": str(entry_id), "mood": mood, "created_at": created_at.isoformat()}
                for entry_id, mood, created_at in cursor.fetchall()
            ]
            cursor.execute(
                "SELECT id, streak_count, created_at FROM checkins WHERE user_id = %s ORDER BY created_at DESC LIMIT 4",
                (user_id,),
            )
            checkins = [
                {"id": str(entry_id), "streak_count": streak_count, "created_at": created_at.isoformat()}
                for entry_id, streak_count, created_at in cursor.fetchall()
            ]
    return {"mood_entries": mood_entries, "checkins": checkins}