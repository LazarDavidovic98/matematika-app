# 🗄️ DATABASE KONFIGURACIJA - SQLAlchemy ORM Setup
# =================================================
# Ovaj fajl postavlja konekciju sa bazom podataka i konfiguracije za SQLAlchemy ORM
# ORM (Object Relational Mapping) omogućava rad sa bazom kroz Python objekte

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from .config import settings

# 🔧 KREIRANJE DATABASE ENGINE-A
# Engine je "srce" SQLAlchemy-ja - upravlja konekcijama sa bazom
engine = create_engine(
    settings.database_url,  # URL baze iz config.py (SQLite ili PostgreSQL)
    echo=settings.debug,    # Ako je debug=True, loguju se svi SQL query-ji u konzoli
    
    # 🔗 CONNECTION ARGUMENTS - različiti za različite baze
    connect_args={
        "check_same_thread": False  # Samo za SQLite - omogućava multi-threading
    } if "sqlite" in settings.database_url else {}  # PostgreSQL ne treba ovo
)

# 🏭 SESSION FACTORY - pravi database session-e  
# Session je kao "razgovor" sa bazom - group related operations u transakciju
SessionLocal = sessionmaker(
    autocommit=False,    # Ručno upravljanje commit-ima (eksplicitno db.commit())
    autoflush=False,     # Ručno upravljanje flush-om (kada se šalju query-ji)
    bind=engine         # Povezano sa našim engine-om
)

# 📋 BASE KLASA ZA MODELE
# Svi naši model (Course, Lesson, Booking) nasleđuju od ove klase
Base = declarative_base()

# 🔄 DEPENDENCY INJECTION ZA FASTAPI
def get_db():
    """
    💉 DATABASE DEPENDENCY za FastAPI endpoint-e
    
    Ova funkcija se koristi kao dependency u API endpoint-ima:
    
    @router.get("/courses")  
    def get_courses(db: Session = Depends(get_db)):
        # db je session koji možemo koristiti za query-je
    
    Generator pattern sa try/finally osigurava da se konekcija uvek zatvori,
    čak i ako dođe do greške tokom izvršavanja.
    """
    db = SessionLocal()  # Kreiraj novu session
    try:
        yield db         # Daj session-u endpoint-u 
    finally:
        db.close()       # Uvek zatvori session (cleanup)

# 🏗️ KREIRANJE TABELA U BAZI
def create_tables():
    """
    📋 KREIRANJE SVIH TABELA DEFINISANIH U MODELIMA
    
    Ova funkcija se poziva pri startup-u aplikacije (main.py).
    Base.metadata.create_all() prolazi kroz sve modele koji nasleđuju Base
    i kreira odgovarajuće tabele ako ne postoje.
    
    Ovo je kao "migration" u Django-u ili Rails-u, ali jednostavniji.
    """
    Base.metadata.create_all(bind=engine)
