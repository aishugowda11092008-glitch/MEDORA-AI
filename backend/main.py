
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime, timezone

app = FastAPI(
    title="MEDORA AI",
    description="AI-Assisted Healthcare Intelligence and Accessibility Platform",
    version="1.0.0"
)

# Allow the React frontend to communicate with the backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "message": "Welcome to MEDORA AI",
        "description": "Healthcare Intelligence and Accessibility Ecosystem",
        "status": "Running"
    }


@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "application": "MEDORA AI",
        "timestamp": datetime.now(timezone.utc).isoformat()
    }


@app.get("/api/modules")
def get_modules():
    return {
        "modules": [
            {
                "id": "mednexus",
                "name": "MEDNEXUS AI",
                "description": "AI-assisted health risk assessment and early prevention"
            },
            {
                "id": "ruralcare",
                "name": "RURALCARE 360",
                "description": "Healthcare access and care coordination"
            },
            {
                "id": "scanwise",
                "name": "SCANWISE AI",
                "description": "Medical report extraction and analysis"
            }
        ]
    }notepad .\backend\main.py
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174",
        "http://localhost:5175",
        "http://127.0.0.1:5175"
    ],
    allow_origin_regex=r"https://.*\.vercel\.app",
