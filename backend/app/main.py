# 🎯 FASTAPI MAIN.PY - SRCE BACKEND APLIKACIJE
# =============================================
# Ovaj fajl je "entry point" (ulazna tačka) našeg backend-a
# Ovde se konfigurišu svi ključni delovi API servera

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware  # Za komunikaciju frontend-backend
from fastapi.staticfiles import StaticFiles           # Za serviranje statičkih fajlova
from fastapi.responses import FileResponse           # Za vraćanje fajlova
from .config import settings                         # Naša konfiguracija
from .database import create_tables                  # Database setup
from .routers import bookings, courses, lessons, contact  # Naši API endpoint-i

# 🚀 KREIRANJE FASTAPI APLIKACIJE
# FastAPI je moderni Python web framework, sličan Express.js-u za Node.js
app = FastAPI(
    title=settings.app_name,  # Ime koje će se pojaviti u API dokumentaciji
    description="Backend API za Matematika App - hibridna aplikacija za učenje matematike i zakazivanje privatnih časova",
    version="1.0.0"
)

# 🌐 CORS MIDDLEWARE - KLJUČNO ZA FRONTEND-BACKEND KOMUNIKACIJU
# CORS (Cross-Origin Resource Sharing) omogućava frontend-u (port 3000) 
# da komunicira sa backend-om (port 8000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins,  # Koji domeni mogu pristupiti API-ju
    allow_credentials=True,                  # Omogućava slanje cookies/auth headers
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],  # HTTP metode
    allow_headers=["*"]                      # Svi headers su dozvoljeni
)

# 🗂️ UKLJUČIVANJE ROUTER-A - MODULARNI PRISTUP API-JU
# Umesto da sve endpoint-e stavljamo u main.py, organizujemo ih po funkcionalnostima
app.include_router(bookings.router)   # /api/bookings/* endpoint-i
app.include_router(courses.router)    # /api/courses/* endpoint-i
app.include_router(lessons.router)    # /api/lessons/* endpoint-i
app.include_router(contact.router)    # /api/contact/* endpoint-i

# 📁 STATIČKI FAJLOVI (Upload-ovani materijali)
# FastAPI može da služi fajlove kao klasičan web server
try:
    # Mount-ujemo uploads folder na /files URL path
    # Primer: /files/math.pdf će vratiti uploads/math.pdf fajl
    app.mount("/files", StaticFiles(directory="uploads"), name="files")
except Exception:
    # Ako uploads folder ne postoji, kreiraj ga pa onda mount-uj
    import os
    os.makedirs("uploads", exist_ok=True)
    app.mount("/files", StaticFiles(directory="uploads"), name="files")

# 🎬 STARTUP EVENT HANDLER
@app.on_event("startup")
async def startup_event():
    """
    🚀 LIFECYCLE EVENT - POKRETANJE APLIKACIJE
    
    Ovaj kod se izvršava JEDNOM kada se aplikacija pokrene.
    Ovde inicijalizujemo resurse koji su potrebni tokom celog rada aplikacije:
    - Database konekcija i tabele
    - Cache sistemi 
    - External API konekcije
    - Background task-ovi
    """
    print("🚀 Pokretanje Matematika App API-ja...")
    
    # 🗄️ INICIJALIZACIJA BAZE PODATAKA
    try:
        create_tables()  # Kreira sve tabele definisane u models.py
        print("✅ Baza podataka je inicijalizovana")
    except Exception as e:
        print(f"❌ Greška pri inicijalizaciji baze: {str(e)}")

# 🏥 HEALTH CHECK ENDPOINT - Za monitoring i Docker health checks
@app.get("/health")
async def health_check():
    """
    💓 HEALTH CHECK ENDPOINT
    
    Koristi se za:
    - Docker health checks u docker-compose.yml
    - Load balancer health checks  
    - Monitoring sistemi (Prometheus, Grafana)
    - CI/CD pipeline validacija
    
    Returns:
        dict: Status i osnovne info o servisu
    """
    return {
        "status": "healthy", 
        "service": "matematika-app-backend",
        "timestamp": "2025-11-12T00:00:00Z"
    }

# 🏠 ROOT ENDPOINT - Dobrodošlica i API dokumentacija
@app.get("/")
async def root():
    """
    🏠 ROOT ENDPOINT - API DOBRODOŠLICA
    
    Prikazuje osnovne informacije o API-ju i dostupne endpoint-e.
    Ovo je prva stvar koju developer vidi kada pristupи http://localhost:8000/
    
    Returns:
        dict: Poruka dobrodošlice i mapa endpoint-a
    """
    return {
        "message": "🎓 Matematika App API je aktivan!",
        "version": "1.0.0",
        "description": "REST API za hibridnu aplikaciju za učenje matematike",
        
        # 📋 MAPA DOSTUPNIH ENDPOINT-A
        "endpoints": {
            "courses": "/api/courses",      # CRUD operacije za kurseve
            "lessons": "/api/lessons",      # CRUD operacije za lekcije + PDF serving
            "bookings": "/api/bookings",    # Zakazivanje privatnih časova
            "contact": "/api/contact"       # Kontakt forma + email sending
        },
        
        # 📚 KORISNI LINKOVI
        "documentation": {
            "swagger_ui": "/docs",          # Interaktivna API dokumentacija
            "redoc": "/redoc",             # Alternativna API dokumentacija
            "openapi_json": "/openapi.json" # OpenAPI 3.0 schema
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
