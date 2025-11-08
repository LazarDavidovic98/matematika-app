from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from .config import settings

# Kreiranje engine-a
engine = create_engine(
    settings.database_url,
    echo=settings.debug,  # Log SQL queries u debug mode-u
    connect_args={"check_same_thread": False} if "sqlite" in settings.database_url else {}
)

# Session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base klasa za modele
Base = declarative_base()

# Dependency za FastAPI - dobijanje database session-a
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Kreiranje tabela (pozvaće se pri pokretanju)
def create_tables():
    Base.metadata.create_all(bind=engine)
