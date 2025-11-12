# 🎓 MATEMATIKA APP - UČEĆI VODIČ ZA FULL STACK DEVELOPMENT
# ================================================================

## 📁 STRUKTURA PROJEKTA (Kako organizovati full stack aplikaciju)

matematika-app/
│
├── 🖥️ FRONTEND (React + Vite + Tailwind CSS)
│   ├── src/
│   │   ├── components/     # Komponente koje se ponovo koriste
│   │   ├── routes/         # Stranice aplikacije (kao views u MVC)
│   │   ├── styles/         # CSS stilovi
│   │   └── App.jsx         # Glavna komponenta
│   ├── public/             # Statički fajlovi (slike, ikone)
│   ├── package.json        # Dependency management za Node.js
│   └── Dockerfile          # Instrukcije za Docker kontejner
│
├── 🔧 BACKEND (FastAPI + Python)
│   ├── app/
│   │   ├── routers/       # API endpoints organizovani po funkcionalnostima
│   │   ├── services/      # Business logika (slanje mejlova, file storage)
│   │   ├── models.py      # Database modeli (struktura tabela)
│   │   ├── schemas.py     # Pydantic schemi (validacija podataka)
│   │   ├── database.py    # Konekcija sa bazom podataka
│   │   ├── config.py      # Konfiguracija aplikacije
│   │   └── main.py        # Entry point backend-a
│   ├── requirements.txt   # Python dependencies
│   ├── Dockerfile        # Instrukcije za Docker kontejner
│   └── init.sql          # Inicijalna database schema
│
├── 🐳 INFRASTRUCTURE (Docker + DevOps)
│   ├── docker-compose.yml    # Orchestracija svih servisa
│   ├── nginx.conf           # Web server konfiguracija
│   └── .github/workflows/   # CI/CD automatizacija
│
└── 📚 DOKUMENTACIJA
    ├── README.md            # Osnovna dokumentacija
    ├── DOCKER_DOCUMENTATION.md
    └── ONLINE_DEPLOYMENT.md

## 🎯 KLJUČNI KONCEPTI FULL STACK APLIKACIJE:

### 1. **SEPARATION OF CONCERNS** (Razdvojene odgovornosti)
```
Frontend (React)     ←→     Backend (FastAPI)     ←→     Database (PostgreSQL)
   │                           │                           │
   ├─ UI/UX                   ├─ Business Logic            ├─ Data Storage
   ├─ User Interaction        ├─ API Endpoints             ├─ Relationships  
   ├─ State Management        ├─ Validation                └─ Transactions
   └─ HTTP Requests           └─ Authentication
```

### 2. **API-FIRST DESIGN** (API kao glavni interfejs)
```
Mobile App ───┐
              ├──→ REST API ───→ Database
Web App ──────┘    (JSON over HTTP)
```

### 3. **REQUEST-RESPONSE CIKLUS**
```
1. User klikne dugme (Frontend)
2. JavaScript pošalje HTTP request (axios/fetch)  
3. FastAPI primi request i validira podatke
4. SQLAlchemy izvršava SQL query nad bazom
5. PostgreSQL vraća rezultate
6. FastAPI formatira odgovor kao JSON
7. Frontend prima JSON i updatuje UI
8. User vidi nove podatke
```

### 4. **CONTAINERIZATION WORKFLOW**
```
docker-compose up ───┐
                     ├──→ Pokreće 4 kontejnera:
                     │    ├─ PostgreSQL (port 5432)
                     │    ├─ FastAPI Backend (port 8000)  
                     │    ├─ React Frontend (port 3000)
                     │    └─ Nginx Proxy (port 80)
                     │
                     └──→ Svi komuniciraju preko Docker network
```

### 5. **DATABASE DESIGN PATTERNS**
```
Courses (1) ──────→ (Many) Lessons
   │                        │
   ├─ id (PK)              ├─ id (PK)
   ├─ title                ├─ title  
   ├─ description          ├─ course_id (FK)
   ├─ level                └─ content
   └─ is_active

Bookings (Many) ────→ (1) Courses  
   │
   ├─ id (PK)
   ├─ course_id (FK)
   ├─ student_name
   ├─ date_time
   └─ status
```

## 🛠️ TEHNOLOGIJE I ZAŠTO SU IZABRANE:

### **Frontend Stack**
- **React**: Komponente, Virtual DOM, ogromna zajednica
- **Vite**: Brži bundler od Create React App
- **Tailwind CSS**: Utility-first CSS, brže od pisanja custom CSS-a
- **Axios**: HTTP client za API pozive

### **Backend Stack** 
- **FastAPI**: Automatska API dokumentacija, async support, tip validation
- **SQLAlchemy**: ORM za lakši rad sa bazom, database migrations
- **Pydantic**: Automatska validacija i serialization JSON ↔ Python objekti
- **Uvicorn**: ASGI server za production-ready performance

### **Database & Infrastructure**
- **PostgreSQL**: Relaciona baza, ACID properties, skalabilnost
- **Docker**: Consistency across environments, lako deployment
- **Nginx**: Reverse proxy, static files serving, load balancing
