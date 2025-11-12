from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from .config import settings
from .database import create_tables
from .routers import bookings, courses, lessons, contact

# Kreiranje FastAPI aplikacije
app = FastAPI(
    title=settings.app_name,
    description="Backend API za Matematika App - hibridna aplikacija za učenje matematike i zakazivanje privatnih časova",
    version="1.0.0"
)

# CORS middleware - omogućava komunikaciju sa frontend-om
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"]
)

# Uključivanje router-a
app.include_router(bookings.router)
app.include_router(courses.router)
app.include_router(lessons.router) 
app.include_router(contact.router)

# Statički fajlovi (upload-ovani materijali)
try:
    app.mount("/files", StaticFiles(directory="uploads"), name="files")
except Exception:
    # Kreiranje uploads direktorijuma ako ne postoji
    import os
    os.makedirs("uploads", exist_ok=True)
    app.mount("/files", StaticFiles(directory="uploads"), name="files")

@app.on_event("startup")
async def startup_event():
    """Inicijalizacija pri pokretanju aplikacije"""
    print("🚀 Pokretanje Matematika App API-ja...")
    
    # Kreiranje tabela u bazi
    try:
        create_tables()
        print("✅ Baza podataka je inicijalizovana")
    except Exception as e:
        print(f"❌ Greška pri inicijalizaciji baze: {str(e)}")

@app.get("/health")
async def health_check():
    """Health check endpoint for monitoring"""
    return {"status": "healthy", "service": "matematika-app-backend"}

@app.get("/")
async def root():
    """Root endpoint - osnovne informacije o API-ju"""
    return {
        "message": "🎓 Matematika App API je aktivan!",
        "version": "1.0.0",
        "endpoints": {
            "courses": "/api/courses",
            "lessons": "/api/lessons", 
            "bookings": "/api/bookings",
            "contact": "/api/contact"
        },
        "docs": "/docs",
        "status": "running"
    }

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "service": settings.app_name,
        "timestamp": "2025-01-01T00:00:00Z"
    }

@app.get("/api/info")
async def api_info():
    """Informacije o API-ju"""
    return {
        "app_name": settings.app_name,
        "version": "1.0.0",
        "description": "API za Matematika App - hibridna aplikacija za učenje matematike",
        "features": [
            "📚 Upravljanje kursevima i lekcijama",
            " Zakazivanje privatnih časova",
            "📧 Email notifikacije",
            "🔍 Pretraga materijala"
        ],
        "contact": "lazar.davidovic98@gmail.com"
    }

# Error handler-i
@app.exception_handler(404)
async def not_found_handler(request, exc):
    return HTTPException(status_code=404, detail="Resurs nije pronađen")

@app.exception_handler(500)
async def internal_error_handler(request, exc):
    return HTTPException(status_code=500, detail="Interna greška servera")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=settings.debug
    )
