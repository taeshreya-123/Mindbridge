import os
from pathlib import Path

import psycopg2
from dotenv import load_dotenv


BACKEND_DIR = Path(__file__).resolve().parent
load_dotenv(BACKEND_DIR / ".env")
EXPECTED_TABLES = {"profiles", "mood_entries", "journal_entries", "checkins"}


def main() -> None:
    database_url = os.getenv("DATABASE_URL")
    if not database_url:
        raise RuntimeError("DATABASE_URL is not set in backend/.env.")

    with psycopg2.connect(database_url) as connection:
        with connection.cursor() as cursor:
            cursor.execute(
                """
                SELECT table_name
                FROM information_schema.tables
                WHERE table_schema = 'public'
                  AND table_name = ANY(%s)
                """,
                (list(EXPECTED_TABLES),),
            )
            found_tables = {row[0] for row in cursor.fetchall()}

    missing_tables = EXPECTED_TABLES - found_tables
    if missing_tables:
        raise RuntimeError("Required database tables are missing.")

    print("Database connection successful")
    print("Tables found")


if __name__ == "__main__":
    main()