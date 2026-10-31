from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
import pymupdf

app = FastAPI(
    title="MEDORA AI Backend",
    description="Healthcare information and report management prototype",
    version="1.0.0"
)

# Allow the local React/Vite frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174",
        "http://localhost:5175",
        "http://127.0.0.1:5175"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class HealthIntake(BaseModel):
    age: int = Field(ge=1, le=120)
    symptoms: str = Field(min_length=3, max_length=1000)
    duration: str = Field(default="Not specified", max_length=100)
    medical_history: str = Field(default="Not provided", max_length=1000)


@app.get("/")
def home():
    return {
        "message": "Welcome to MEDORA AI",
        "status": "Running",
        "version": "1.0.0"
    }


@app.get("/api/health")
def health():
    return {
        "status": "healthy",
        "application": "MEDORA AI",
        "backend": "online"
    }


@app.get("/api/modules")
def get_modules():
    return {
        "modules": [
            {
                "id": "mednexus",
                "name": "MEDNEXUS AI",
                "description": "Health information intake"
            },
            {
                "id": "scanwise",
                "name": "SCANWISE AI",
                "description": "Medical PDF text extraction"
            },
            {
                "id": "ruralcare",
                "name": "RURALCARE 360",
                "description": "Healthcare access and coordination"
            }
        ]
    }


@app.post("/api/mednexus/assess")
def assess_health(data: HealthIntake):
    return {
        "success": True,
        "module": "MEDNEXUS AI",
        "patient_information": data.model_dump(),
        "review_status": "Pending professional review",
        "message": "Your health information has been received successfully.",
        "disclaimer": (
            "This prototype does not diagnose diseases or replace "
            "professional medical advice."
        )
    }


@app.post("/api/scanwise/upload")
async def scanwise_upload(file: UploadFile = File(...)):

    if not file.filename or not file.filename.lower().endswith(".pdf"):
        raise HTTPException(
            status_code=400,
            detail="Please upload a PDF file."
        )

    content = await file.read(10 * 1024 * 1024 + 1)

    if len(content) > 10 * 1024 * 1024:
        raise HTTPException(
            status_code=413,
            detail="Maximum PDF size is 10 MB."
        )

    try:
        with pymupdf.open(stream=content, filetype="pdf") as document:

            if document.page_count > 50:
                raise HTTPException(
                    status_code=400,
                    detail="Maximum 50 pages allowed."
                )

            page_count = document.page_count

            extracted_text = "\n".join(
                page.get_text() for page in document
            )

    except HTTPException:
        raise

    except Exception:
        raise HTTPException(
            status_code=400,
            detail="Unable to read this PDF. Please try another file."
        )

    return {
        "success": True,
        "module": "SCANWISE AI",
        "filename": file.filename,
        "page_count": page_count,
        "extracted_text": extracted_text[:20000],
        "truncated": len(extracted_text) > 20000,
        "message": (
            "PDF text extracted successfully."
            if extracted_text.strip()
            else "No selectable text found. OCR is not connected yet."
        ),
        "disclaimer": (
            "Verify extracted medical information with a healthcare "
            "professional. This tool does not interpret or diagnose."
        )
    }
