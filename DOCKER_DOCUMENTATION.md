# Docker Dokumentacija - Matematika App

## Šta je Docker?

Docker je platforma za kontejnerizaciju koja omogućava pakovanje aplikacije i svih njenih zavisnosti u lagan, portabilan kontejner. Kontejneri se izvršavaju izolovano od host operativnog sistema i garantuju da će aplikacija raditi isto na bilo kojem sistemu koji pokreće Docker.

### Ključni koncepti:

- **Image (Slika)**: Template za kreiranje kontejnera
- **Container (Kontejner)**: Pokrenuta instanca image-a
- **Dockerfile**: Tekstualni fajl sa instrukcijama za kreiranje image-a
- **Docker Compose**: Alat za definisanje i pokretanje multi-container Docker aplikacija

## Arhitektura Matematika App

Naša aplikacija se sastoji od 4 glavna servisa:

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│     Nginx       │    │   React         │    │   FastAPI       │    │   PostgreSQL    │
│  (Reverse Proxy)│◄───│  (Frontend)     │◄───│   (Backend)     │◄───│   (Database)    │
│   Port: 80      │    │   Port: 3000    │    │   Port: 8000    │    │   Port: 5432    │
└─────────────────┘    └─────────────────┘    └─────────────────┘    └─────────────────┘
```

## Struktura Docker fajlova

### 1. docker-compose.yml
Glavni fajl koji definiše sve servise:

```yaml
version: '3.8'

services:
  database:      # PostgreSQL baza podataka
  backend:       # FastAPI Python aplikacija
  frontend:      # React aplikacija
  nginx:         # Reverse proxy server
```

### 2. backend/Dockerfile
Definiše kako da se kreira backend kontejner:
- Koristi Python 3.11 slim image
- Instalira zavisnosti iz requirements.txt
- Konfigurišio za uvicorn server

### 3. frontend/Dockerfile
Definiše kako da se kreira frontend kontejner:
- Multi-stage build (Node.js za build, nginx za serving)
- Koristi npm za instalaciju zavisnosti
- Kopira built fajlove u nginx

## Kako pokrenuti aplikaciju

### Preduslovi:
1. **Docker Desktop** mora biti instaliran i pokrenut
2. **Git** (opciono, za kloniranje repo-a)

### Korak-po-korak instrukcije:

#### 1. Kloniranje repozitorijuma (ako nije već skinuto)
```bash
git clone https://github.com/LazarDavidovic98/matematika-app.git
cd matematika-app
```

#### 2. Provera Docker instalacije
```bash
docker --version
docker-compose --version
```

#### 3. Konfiguracija environment varijabli (opciono)
Edituj `.env` fajl da podesiš email konfiguraciju:
```env
SMTP_USERNAME=your_email@gmail.com
SMTP_PASSWORD=your_app_password
```

#### 4. Pokretanje aplikacije

**Prva opcija: Sa build procesom (preporučeno za prvi put)**
```bash
docker-compose up --build
```

**Druga opcija: U pozadini (detached mode)**
```bash
docker-compose up --build -d
```

**Treća opcija: Bez build-a (ako su image-i već kreirani)**
```bash
docker-compose up
```

### Pristupanje aplikaciji:

- **Frontend (React)**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API dokumentacija**: http://localhost:8000/docs
- **Nginx (produkcija)**: http://localhost
- **PostgreSQL**: localhost:5432 (korisnik: admin, šifra: password123)

## Korisne Docker komande

### Osnovne komande:

```bash
# Pokretanje svih servisa
docker-compose up

# Pokretanje u pozadini
docker-compose up -d

# Zaustavljanje svih servisa
docker-compose down

# Zaustavljanje i brisanje volume-a (baza se briše!)
docker-compose down -v

# Rebuild bez cache
docker-compose build --no-cache

# Pregled pokretnih kontejnera
docker ps

# Pregled svih kontejnera (uključujući zaustavljene)
docker ps -a
```

### Log komande:

```bash
# Svi log-ovi
docker-compose logs

# Real-time log-ovi
docker-compose logs -f

# Log-ovi specifičnog servisa
docker-compose logs backend
docker-compose logs frontend
docker-compose logs database

# Poslednji N log-ova
docker-compose logs --tail=50 backend
```

### Debugging komande:

```bash
# Pristup bash-u u kontejneru
docker exec -it matematika_backend bash
docker exec -it matematika_db psql -U admin -d matematika_db

# Inspekcija kontejnera
docker inspect matematika_backend

# Korišćenje resursa
docker stats

# Pregled image-a
docker images

# Brisanje nekorišćenih image-a
docker image prune
```

## Troubleshooting

### Problem: "Port already in use"
```bash
# Proveri ko koristi port
netstat -ano | findstr :8000
netstat -ano | findstr :3000
netstat -ano | findstr :5432

# Zaustavi Docker kontejnere
docker-compose down
```

### Problem: "Cannot connect to Docker daemon"
1. Proverite da li je Docker Desktop pokrenut
2. Restartuj Docker Desktop
3. Ako na Windows-u, proverite WSL 2

### Problem: "Image build failed"
```bash
# Rebuild bez cache
docker-compose build --no-cache

# Proverite Dockerfile sintaksu
docker build -t test-backend ./backend
```

### Problem: Database connection errors
1. Proverite da li je database servis pokrenut: `docker-compose ps`
2. Proverite log-ove: `docker-compose logs database`
3. Environment varijable: proverite DATABASE_URL

### Problem: Frontend/Backend ne komuniciraju
1. Proverite docker network: `docker network ls`
2. Proverite da servisi koriste ispravne hostname-ove (iz docker-compose.yml)

## Development vs Production

### Development mode:
```bash
# Samo database
docker-compose up database

# Pokreni backend lokalno
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload

# Pokreni frontend lokalno  
cd frontend
npm install
npm run dev
```

### Production mode:
```bash
# Svi servisi sa nginx
docker-compose up -d
```

## Backup i Restore

### Backup baze podataka:
```bash
docker exec matematika_db pg_dump -U admin matematika_db > backup.sql
```

### Restore baze podataka:
```bash
docker exec -i matematika_db psql -U admin matematika_db < backup.sql
```

## Security napomene

1. **Environment varijable**: Nikad ne commit-uj stvarne šifre u Git
2. **Database šifre**: Promeni default šifre u produkciji
3. **SSL**: Konfiguriši HTTPS u produkciji
4. **Firewall**: Ograniči pristup portovima

## Performanse

### Optimizacija:
- Koristi multi-stage build za manje image-e
- .dockerignore fajlove za brže build-ove
- Docker layer caching
- Koristi Alpine Linux images gde god možeš

### Monitoring:
```bash
# Resource usage
docker stats

# Container health
docker-compose ps
```

---

## Ukratko - Brzе pokretanje:

```bash
# 1. Otvori Docker Desktop
# 2. Otvori terminal u matematika-app direktorijumu
# 3. Pokreni:
docker-compose up --build -d

# 4. Pristup aplikaciji:
# Frontend: http://localhost:3000
# Backend: http://localhost:8000
# API docs: http://localhost:8000/docs
```

**Napomena**: Prvi put može potrajati nekoliko minuta zbog download-a image-a i build procesa.

---

## Kompletna lista Docker komandi za Matematika App

### 🚀 OSNOVNE KOMANDE ZA POKRETANJE

#### 1. Provera instalacije
```bash
docker --version                    # Provera Docker verzije
docker-compose --version           # Provera Docker Compose verzije
docker info                        # Detaljne informacije o Docker sistemu
```

#### 2. Pokretanje aplikacije (izaberi jednu opciju)
```bash
# OPCIJA A: Prvo pokretanje sa build procesom (PREPORUČENO)
docker-compose up --build

# OPCIJA B: Pokretanje u pozadini (detached mode)
docker-compose up --build -d

# OPCIJA C: Pokretanje bez build-a (brže, ako su image-i već kreirani)
docker-compose up -d

# OPCIJA D: Pokretanje samo jednog servisa
docker-compose up database          # Samo baza podataka
docker-compose up backend           # Samo backend
docker-compose up frontend          # Samo frontend
```

#### 3. Zaustavljanje aplikacije
```bash
docker-compose down                 # Zaustavlja sve kontejnere
docker-compose down -v              # Zaustavlja i briše volume-e (PAŽNJA: briše bazu!)
docker-compose stop                 # Zaustavlja bez brisanja kontejnera
docker-compose start                # Pokretaje zaustavljena kontejnere
```

### 📊 KOMANDE ZA PRAĆENJE I DEBUGGING

#### 1. Status i pregled kontejnera
```bash
docker ps                          # Aktivni kontejneri
docker ps -a                       # Svi kontejneri (uključujući zaustavljene)
docker-compose ps                  # Status servisa iz docker-compose.yml
docker stats                       # Real-time resource usage
docker system df                   # Disk usage Docker-a
```

#### 2. Log komande
```bash
# Pregled log-ova
docker-compose logs                # Svi log-ovi
docker-compose logs -f             # Real-time log-ovi (follow)
docker-compose logs --tail=100     # Poslednjih 100 linija

# Log-ovi specifičnih servisa
docker-compose logs backend        # Samo backend log-ovi  
docker-compose logs frontend       # Samo frontend log-ovi
docker-compose logs database       # Samo database log-ovi
docker-compose logs nginx          # Samo nginx log-ovi

# Real-time praćenje specifičnog servisa
docker-compose logs -f backend     # Prati backend log-ove u realnom vremenu
```

#### 3. Pristup kontejnerima (debugging)
```bash
# Pristup bash terminalu kontejnera
docker exec -it matematika_backend bash           # Backend container
docker exec -it matematika_frontend sh            # Frontend container (Alpine Linux)
docker exec -it matematika_db bash                # Database container

# Direktan pristup PostgreSQL bazi
docker exec -it matematika_db psql -U admin -d matematika_db

# Izvršavanje pojedinačnih komandi u kontejneru
docker exec matematika_backend ls -la /app        # Lista fajlova u backend-u
docker exec matematika_db pg_dump -U admin matematika_db  # Backup baze
```

### 🔧 BUILD I DEVELOPMENT KOMANDE

#### 1. Build komande
```bash
# Rebuild svih servisa
docker-compose build              # Build sa cache-om
docker-compose build --no-cache   # Build bez cache-a (sporiji, ali sveži)
docker-compose build backend      # Build samo backend-a
docker-compose build frontend     # Build samo frontend-a

# Rebuild i pokretanje odjednom
docker-compose up --build         # Build + run
docker-compose up --build backend # Build + run samo backend

# Testiranje build-a pojedinačno
docker build -t test-backend ./backend     # Test backend Dockerfile
docker build -t test-frontend ./frontend   # Test frontend Dockerfile
```

#### 2. Development komande
```bash
# Pokretanje samo baze za lokalni development
docker-compose up database -d

# Pokretanje bez nginx-a (za development)
docker-compose up database backend frontend -d

# Restart specifičnog servisa
docker-compose restart backend    # Restart backend-a
docker-compose restart frontend   # Restart frontend-a
```

### 🔍 NETWORK I VOLUME KOMANDE

#### 1. Network management
```bash
docker network ls                           # Lista Docker mreža
docker network inspect matematika_network  # Detalji o aplikacijskoj mreži
docker-compose exec backend ping database  # Test konekcije između servisa
```

#### 2. Volume management
```bash
docker volume ls                          # Lista volume-a
docker volume inspect matematika_postgres_data  # Detalji o volume-u
docker-compose down -v                    # Briše volume-e (PAŽNJA!)

# Backup i restore volume-a
docker run --rm -v matematika_postgres_data:/data -v $(pwd):/backup alpine tar czf /backup/backup.tar.gz /data
```

### 🧹 CLEANUP KOMANDE

#### 1. Brisanje image-a i kontejnera
```bash
# Brisanje neaktivnih resursa
docker system prune              # Briše nekorišćene kontejnere, networks, images
docker system prune -a           # Briše sve nekorišćene image-e
docker system prune -f           # Force brisanje bez potvrde

# Specifično brisanje
docker container prune           # Briše zaustavljene kontejnere
docker image prune              # Briše netagovane image-e  
docker volume prune             # Briše nekorišćene volume-e
docker network prune            # Briše nekorišćene networks

# Brisanje specifičnih image-a
docker rmi matematika-app_backend    # Briše backend image
docker rmi matematika-app_frontend   # Briše frontend image
```

#### 2. Kompletno čišćenje
```bash
# PAŽNJA: Ove komande brišu SVE Docker podatke!
docker-compose down --rmi all --volumes --remove-orphans  # Kompletno brisanje
docker system prune -a --volumes     # Briše sve Docker podatke
```

### 🔐 SIGURNOST I BACKUP KOMANDE

#### 1. Backup baze podataka
```bash
# Kreiranje backup-a
docker exec matematika_db pg_dump -U admin matematika_db > backup_$(date +%Y%m%d).sql

# Backup sa kompresijom
docker exec matematika_db pg_dump -U admin -Fc matematika_db > backup_$(date +%Y%m%d).dump

# Automatski backup (dodaj u cron job)
docker exec matematika_db pg_dump -U admin matematika_db | gzip > backup_$(date +%Y%m%d).sql.gz
```

#### 2. Restore baze podataka
```bash
# Restore iz SQL fajla
docker exec -i matematika_db psql -U admin -d matematika_db < backup.sql

# Restore iz dump fajla
docker exec -i matematika_db pg_restore -U admin -d matematika_db backup.dump

# Restore sa recreate baze
docker exec -i matematika_db psql -U admin -c "DROP DATABASE IF EXISTS matematika_db; CREATE DATABASE matematika_db;"
docker exec -i matematika_db psql -U admin -d matematika_db < backup.sql
```

### 📈 PERFORMANCE I MONITORING KOMANDE

#### 1. Performance monitoring
```bash
docker stats                               # Resource usage svih kontejnera
docker stats matematika_backend           # Resource usage backend-a
docker top matematika_backend             # Procesi u kontejneru
docker exec matematika_backend ps aux     # Detaljni procesi

# Memory usage
docker exec matematika_backend free -h    # Memory usage backend-a
docker exec matematika_db free -h         # Memory usage baze
```

#### 2. Health check komande
```bash
# Test conectivity
curl http://localhost:8000/health         # Backend health check
curl http://localhost:3000                # Frontend check
curl http://localhost:8000/docs           # API docs check

# Database connectivity test
docker exec matematika_db pg_isready -U admin -d matematika_db
```

### 🚨 TROUBLESHOOTING KOMANDE

#### 1. Česte greške i rešenja
```bash
# Problem: "Port already in use"
netstat -ano | findstr :8000             # Ko koristi port 8000
netstat -ano | findstr :3000             # Ko koristi port 3000
netstat -ano | findstr :5432             # Ko koristi port 5432

# Zaustavi proces koji koristi port (Windows)
taskkill /PID <PID_NUMBER> /F

# Problem: "No space left on device"
docker system df                          # Pregled disk usage
docker system prune -a                   # Oslobodi prostor

# Problem: "Cannot connect to Docker daemon"
# Na Windows - restart Docker Desktop:
net stop com.docker.service & net start com.docker.service
```

#### 2. Advanced debugging
```bash
# Inspect kontejnera
docker inspect matematika_backend         # Detaljne info o backend kontejneru
docker inspect matematika_network         # Network konfiguracija

# Environment varijable u kontejneru
docker exec matematika_backend env        # Lista env varijabli

# File system u kontejneru
docker exec matematika_backend ls -la /app/     # Sadržaj app direktorijuma
docker exec matematika_backend cat /app/config.py  # Čitanje fajla
```

### 🎯 PRODUCTION KOMANDE

#### 1. Production deployment
```bash
# Production build sa optimizacijom
DOCKER_BUILDKIT=1 docker-compose build --no-cache

# Production run sa resource limits
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d

# Health check u produkciji
docker-compose exec backend python -c "import requests; print(requests.get('http://localhost:8000/health').status_code)"
```

#### 2. Scaling (ako je potrebno)
```bash
# Skaliranje servisa (više instanci)
docker-compose up --scale backend=3       # 3 backend instance
docker-compose up --scale frontend=2      # 2 frontend instance
```

---

### 🏃‍♂️ QUICK START - Kopij/Zalepi komande:

**Za potpuno novo pokretanje:**
```bash
cd c:\Users\Administrator\Desktop\matematika-app
docker-compose up --build -d
docker-compose logs -f
```

**Za proveru da li radi:**
```bash
docker ps
curl http://localhost:8000/health
curl http://localhost:3000
```

**Za zaustavljanje:**
```bash
docker-compose down
```

**Za ponovnо pokretanje:**
```bash
docker-compose up -d
```
