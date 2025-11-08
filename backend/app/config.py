from pydantic_settings import BaseSettings
import os

class Settings(BaseSettings):
    # Database configuration
    database_url: str = "postgresql://admin:password123@database:5432/matematika_db"
    
    # Email SMTP configuration
    smtp_server: str = "smtp.gmail.com"
    smtp_port: int = 587
    smtp_username: str = ""  # Treba podesiti u .env
    smtp_password: str = ""  # Treba podesiti u .env
    notification_email: str = "lazar.davidovic98@gmail.com"
    
    # App configuration
    app_name: str = "Matematika App"
    debug: bool = True
    
    # CORS settings
    allowed_origins: list = [
        "http://localhost:3000",  # React dev server
        "http://localhost:5173",  # Vite dev server
        "http://localhost:8080",  # Primary frontend port
        "http://127.0.0.1:3000",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:8080"
    ]
    
    # Secret key za JWT (ako bude potreban)
    secret_key: str = "matematika-app-secret-key-change-in-production"
    
    class Config:
        env_file = ".env"

# Kreiranje globalne instance
settings = Settings()
