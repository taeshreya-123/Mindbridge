from fastapi import FastAPI


app = FastAPI()


@app.get("/api/health")
def health_check() -> dict[str, str]:
    """Confirm that the API is running."""
    return {"status": "ok"}