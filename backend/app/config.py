# ⚙️ KONFIGURACIJA APLIKACIJE - CENTRALNO MESTO ZA POSTAVKE
# ==========================================================
# Ovaj fajl sadrži sve konfiguracije aplikacije
# Pydantic Settings omogućava čitanje iz environment varijabli i .env fajlova

from pydantic_settings import BaseSettings
import os

class Settings(BaseSettings):
    """
    🛠️ CENTRALNA KONFIGURACIJA APLIKACIJE
    
    Pydantic BaseSettings automatski:
    1. Čita environment varijable (DATABASE_URL, SMTP_PASSWORD, itd.)
    2. Čita .env fajl iz root-a projekta
    3. Koristi default vrednosti ako varijable nisu definisane
    4. Validira tipove podataka
    """
    
    # 🗄️ DATABASE KONFIGURACIJA
    # Različite baze za različite environment-e
    database_url: str = os.getenv(
        "DATABASE_URL", 
        "sqlite:///./matematika_app.db"  # Default: SQLite za development
        # Production bi bio: "postgresql://user:password@localhost/dbname"
    )
    
    # 📧 EMAIL SMTP KONFIGURACIJA
    # Za slanje email notifikacija (zakazivanje časova, kontakt forma)
    smtp_server: str = "smtp.gmail.com"        # Gmail SMTP server
    smtp_port: int = 587                       # TLS port
    smtp_username: str = ""                    # Email adresa (čita se iz .env)
    smtp_password: str = ""                    # App password (čita se iz .env)
    notification_email: str = "lazar.davidovic98@gmail.com"  # Gde stižu notifikacije
    
    # 🚀 OSNOVNA APP KONFIGURACIJA
    app_name: str = "Matematika App"           # Ime aplikacije (u API docs)
    debug: bool = True                         # Development mode (više log-ova, hot reload)
    
    # 🌐 CORS SETTINGS - Cross-Origin Resource Sharing
    # Lista domena koji mogu pristupiti našem API-ju
    allowed_origins: list = [
        "http://localhost:3000",   # React dev server (npm start)
        "http://localhost:5173",   # Vite dev server (npm run dev)
        "http://localhost:8080",   # Production frontend port
        "http://127.0.0.1:3000",   # Alternativni localhost format
        "http://127.0.0.1:5173",
        "http://127.0.0.1:8080"
    ]
    
    # 🔐 SIGURNOST - Secret key za JWT tokene (ako bude autentifikacije)
    secret_key: str = "matematika-app-secret-key-change-in-production"
    
    # 📁 PYDANTIC KONFIGURACIJA
    class Config:
        env_file = ".env"  # Čita .env fajl automatski
        case_sensitive = False  # Environment varijable nisu case-sensitive

# 🌍 GLOBALNA INSTANCA SETTINGS-a
# Koristi se kroz celu aplikaciju: from .config import settings
settings = Settings()
