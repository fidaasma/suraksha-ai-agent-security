from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from security_tests import run_security_scan


app = FastAPI(
    title="Suraksha API",
    description="AI Agent Security Testing API",
    version="1.0.0",
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class TestRequest(BaseModel):
    agentName: str
    systemPrompt: str


@app.get("/")
def home():
    return {
        "message": "Suraksha backend is running",
        "version": "1.0.0",
    }


@app.post("/api/test")
def test_agent(request: TestRequest):

    if not request.agentName.strip():
        raise HTTPException(
            status_code=400,
            detail="Agent name is required."
        )

    if not request.systemPrompt.strip():
        raise HTTPException(
            status_code=400,
            detail="System prompt is required."
        )

    try:
        result = run_security_scan(
            request.systemPrompt
        )

        return result

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=f"Security scan failed: {str(error)}"
        )