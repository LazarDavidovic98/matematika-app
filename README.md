# 🎓 Matematika App

Hibridna web i mobile aplikacija za učenje matematike i zakazivanje privatnih časova. Aplikacija koristi Python FastAPI backend, React frontend i PostgreSQL bazu podataka.

## 🚀 Funkcionalnosti

### Frontend (React)
- � **Login sistem** - sigurna autentifikacija (Username: Lazar, Password: Da## 🧪 Testiranje Aplikacije

### 🔐 Login Test
1. Otvorite http://localhost:3001
2. Unesite korisničke podatke:
   - **Username:** `Lazar`
   - **Password:** `Davidovic`
3. Kliknite "Prijavite se"
4. Aplikacija treba da se otvori sa glavnim interface-om

### ✅ Funkcionalnosti za testiranje
- **Login/Logout ciklus** - prijava i odjava
- **Session persistence** - refresh browser-a treba da zadrži login
- **Zakazivanje časova** - forma šalje email
- **Navigacija** - sve stranice dostupne nakon login-a
- **Responsive design** - testirati na različitim screen size-ovima

### 📱 Mobile/Hibridna Funkcionalnost

Aplikacija je dizajnirana kao **hibridna** - funkcionalnost za web i mobile:ovic)
- �📱 **Responsivna hibridna aplikacija** - funkcionalnost web i mobile aplikacije  
- 🎨 **Moderno korisničko sučelje** - pastelne boje i intuitivni dizajn
- 🧭 **Navigacija sa sidebar-om** - logo i 6 glavnih stranica + logout
- 📚 **Kursevi matematike** - strukturirani sadržaj za sve nivoe
- 🎥 **Video lekcije** - besplatni i premium sadržaj
- 📖 **Baza definicija** - pretraga matematičkih pojmova
- 📅 **Zakazivanje časova** - forma za privatne časove
- 📧 **Kontakt forma** - direktna komunikacija

### Backend (Python FastAPI)
- 🔧 **FastAPI framework** - moderna, brža Python REST API
- 🗄️ **PostgreSQL baza** - relacijska baza sa SQLAlchemy ORM
- 📬 **Email notifikacije** - SMTP integracija za obaveštenja
- 🔐 **CORS podrška** - bezbedna komunikacija frontend-backend
- 📊 **API dokumentacija** - automatska Swagger/OpenAPI dokumentacija
- 🔍 **Napredne pretrage** - filtriranje po kategorijama i nivou

### DevOps & Hosting
- 🐳 **Docker kontejneri** - potpuna kontejnerizacija aplikacije
- 🌐 **Nginx reverse proxy** - load balancing i SSL terminacija
- 🔒 **SSL/HTTPS podrška** - bezbedni saobraćaj
- ⚡ **Production-ready** - optimizovano za javno hostovanje

## 📁 Struktura Projekta

```
matematika-app/
├─ backend/                     # Python FastAPI backend
│  ├─ app/
│  │  ├─ main.py               # FastAPI aplikacija + CORS
│  │  ├─ config.py             # Konfiguracija (env, SMTP, DB)
│  │  ├─ database.py           # SQLAlchemy session/engine
│  │  ├─ models.py             # SQLAlchemy modeli
│  │  ├─ schemas.py            # Pydantic šeme
│  │  ├─ routers/              # API endpoint-i
│  │  │  ├─ bookings.py        # /api/bookings (zakazivanje časova)
│  │  │  ├─ courses.py         # /api/courses (kursevi)
│  │  │  ├─ lessons.py         # /api/lessons (lekcije)
│  │  │  ├─ definitions.py     # /api/definitions (definicije)
│  │  │  └─ contact.py         # /api/contact (kontakt forma)
│  │  └─ services/
│  │     ├─ mailer.py          # Email servisi
│  │     └─ storage.py         # File upload servisi
│  ├─ alembic/                 # Database migracije
│  ├─ requirements.txt         # Python zavisnosti
│  ├─ Dockerfile              # Docker konfiguracija
│  ├─ .env.template           # Template za environment varijable
│  └─ init.sql                # Početni podaci za bazu
│
├─ frontend/                   # React aplikacija
│  ├─ public/
│  │  └─ images/
│  │     └─ logo-bulb.png     # Logo aplikacije
│  ├─ src/
│  │  ├─ main.jsx             # Entry point
│  │  ├─ App.jsx              # Glavna komponenta sa routing-om + autentifikacija
│  │  ├─ routes/              # Stranice aplikacije
│  │  │  ├─ Onama.jsx         # O nama stranica
│  │  │  ├─ Casovi.jsx        # Privatni časovi + forma
│  │  │  ├─ Kursevi.jsx       # Lista kurseva
│  │  │  ├─ Lekcije.jsx       # Video lekcije
│  │  │  ├─ Definicije.jsx    # Matematičke definicije
│  │  │  └─ Kontakt.jsx       # Kontakt forma
│  │  ├─ components/
│  │  │  ├─ Sidebar.jsx       # Navigacija sa logo-om + logout
│  │  │  ├─ Login.jsx         # Login forma sa autentifikacijom
│  │  │  └─ BookingForm.jsx   # Forma za zakazivanje
│  │  └─ styles/
│  │     └─ tailwind.css      # Tailwind CSS + custom stilovi
│  ├─ package.json            # Node.js zavisnosti
│  ├─ vite.config.js         # Vite konfiguracija
│  ├─ tailwind.config.js     # Tailwind konfiguracija
│  └─ Dockerfile             # Docker konfiguracija
│
├─ docker-compose.yml         # Multi-kontejner setup
├─ nginx.conf                # Nginx konfiguracija
└─ README.md                 # Dokumentacija
```

## 🛠️ Tehnologije

### Backend
- **Python 3.11** - programski jezik
- **FastAPI** - web framework za API
- **SQLAlchemy** - ORM za bazu podataka
- **PostgreSQL** - relaciona baza podataka
- **Pydantic** - validacija podataka
- **Alembic** - database migracije
- **aiosmtplib** - asinkroni SMTP za email

### Frontend
- **React 18** - JavaScript biblioteka za UI
- **Vite** - build tool i dev server
- **React Router** - client-side routing
- **Tailwind CSS** - utility-first CSS framework
- **Axios** - HTTP client za API pozive
- **Lucide React** - ikone

### DevOps
- **Docker & Docker Compose** - kontejnerizacija
- **Nginx** - reverse proxy i web server
- **PostgreSQL** - baza podataka

## 🏃‍♂️ Pokretanje Aplikacije

### Preduslov
- Docker i Docker Compose instalirani
- Git instaliran

### 1. Kloniranje Repositorija
```bash
git clone <repository-url>
cd matematika-app
```

### 2. Konfiguracija Environment Varijabli
```bash
# Backend konfiguracija
cp backend/.env.template backend/.env
# Edituj backend/.env sa stvarnim vrednostima
```

**Važne environment varijable:**
```env
# Email konfiguracija (Gmail)
SMTP_USERNAME=your-email@gmail.com
SMTP_PASSWORD=your-app-password  # Gmail App Password
NOTIFICATION_EMAIL=lazar.davidovic98@gmail.com

# Database (Docker će koristiti ove vrednosti)
DATABASE_URL=postgresql://admin:password123@database:5432/matematika_db
```

### 3. Pokretanje sa Docker Compose
```bash
# Development
docker-compose up -d

# Production
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

### 4. Pristup Aplikaciji
- **Frontend:** http://localhost:3000 (ili http://localhost:3001)
- **Login podaci:** Username: `Lazar` / Password: `Davidovic`
- **Backend API:** http://localhost:8000
- **API Dokumentacija:** http://localhost:8000/docs
- **Nginx (Production):** http://localhost

## � Login i Autentifikacija

Aplikacija koristi jednostavan ali siguran login sistem sa localStorage persistencom.

### Demo Korisnik
```
Username: Lazar
Password: Davidovic
```

### Funkcionalnosti
- **Autentifikacija:** Potrebna prijava za pristup aplikaciji
- **Session Management:** Login se pamti u localStorage
- **Logout opcija:** Dugme za odjavu u sidebar-u
- **Responsive dizajn:** Login forma prilagođena svim uređajima
- **Loading animacije:** Smooth korisničko iskustvo

### Bezbednost
- Input validacija na frontend-u
- Error handling za neispravne podatke
- Session cleanup pri logout-u

## �📧 Email Konfiguracija

Za slanje email notifikacija potrebno je konfigurirati Gmail SMTP:

### 1. Gmail App Password
1. Idite na [Google Account Settings](https://myaccount.google.com/)
2. Aktivirajte 2-Factor Authentication
3. Generirajte App Password za "Mail"
4. Koristite taj password u `SMTP_PASSWORD`

### 2. Environment Varijable
```env
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=your-email@gmail.com
SMTP_PASSWORD=generated-app-password
NOTIFICATION_EMAIL=lazar.davidovic98@gmail.com
```

## 🌐 Production Deployment

### 1. SSL Sertifikat (Let's Encrypt)
```bash
# Instaliraj Certbot
sudo apt install certbot python3-certbot-nginx

# Generiši sertifikat
sudo certbot --nginx -d matematika-app.com -d www.matematika-app.com
```

### 2. Domain Konfiguracija
Ažuriraj `nginx.conf` sa vašim domain-om:
```nginx
server_name matematika-app.com www.matematika-app.com;
```

### 3. Production Environment
```bash
# Production build
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d

# Monitoring logs
docker-compose logs -f
```

## 🔧 Development

### Backend Development
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\\Scripts\\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Frontend Development
```bash
cd frontend
npm install
npm run dev
```

**🔐 Login za pristup aplikaciji:**
- **Username:** `Lazar`
- **Password:** `Davidovic`

### Database Migracije
```bash
cd backend
# Kreiranje nove migracije
alembic revision --autogenerate -m "Add new table"

# Primena migracije
alembic upgrade head
```

## 📊 API Endpoints

### Kursevi
- `GET /api/courses/` - Lista kurseva
- `POST /api/courses/` - Kreiranje kursa
- `GET /api/courses/{id}` - Detalji kursa
- `PUT /api/courses/{id}` - Ažuriranje kursa
- `DELETE /api/courses/{id}` - Brisanje kursa

### Lekcije
- `GET /api/lessons/` - Lista lekcija
- `GET /api/lessons/course/{course_id}` - Lekcije po kursu
- `POST /api/lessons/` - Kreiranje lekcije

### Definicije
- `GET /api/definitions/` - Lista definicija
- `GET /api/definitions/categories` - Kategorije
- `POST /api/definitions/` - Dodavanje definicije

### Zakazivanje Časova
- `POST /api/bookings/` - Zakazivanje časa (šalje email)
- `GET /api/bookings/` - Lista zahteva (admin)
- `PUT /api/bookings/{id}` - Ažuriranje statusa

### Kontakt
- `POST /api/contact/` - Slanje kontakt poruke
- `GET /api/contact/` - Lista poruka (admin)

## 🎨 UI/UX Design

### Pastelne Boje
- **Primary:** Plavo-ljubičasta (#667eea)
- **Secondary:** Narandžasta (#f97316) 
- **Accent:** Tirkizna (#14b8a6)
- **Neutral:** Sive nijanse za tekst

### Komponente
- **Kartice:** Zaobljeni uglovi, senke, hover efekti
- **Dugmad:** Gradijenti, tranzicije, fokus indikatori
- **Forme:** Čisti input-i, validacija, loading stanja
- **Navigacija:** Fiksna sidebar sa logo-om i ikonama

### Responsivnost
- **Mobile-first** pristup
- **Grid sistem** sa Tailwind CSS
- **Flex layout-i** za komponente
- **Breakpoint-i:** sm, md, lg, xl

## 🔒 Bezbednost

### CORS
- Konfigurisan za development i production domene
- Strict origin policy

### Rate Limiting (Nginx)
- API endpoints: 10 zahteva/sekundi
- Login endpoints: 1 zahtev/sekundi

### SQL Injection
- SQLAlchemy ORM sa prepared statements
- Pydantic validacija input-a

### XSS Protection
- Content Security Policy header-i
- Input sanitization na frontend-u

## 📱 Mobile/Hibridna Funkcionalnost

Aplikacija je dizajnirana kao **hibridna** - funkcionalnost za web i mobile:

### Progressive Web App (PWA)
- Responsivan dizajn za sve screen size-ove
- Touch-friendly interface
- Fast loading sa optimizovanim asset-ima

### Mobile Optimization
- Sidebar se collapsed na mobile uređajima
- Swipe gestures za navigaciju
- Optimizovani form-i za mobile input

### Performance
- Lazy loading komponenti
- Image optimization
- Cached API responses

## 🚀 Buduća Proširenja

### Planirana Proširenja
1. **Napredni korisnički sistem** - registracija, role-based access, profili
2. **JWT autentifikacija** - backend token-based security
3. **Password reset** - email-based password recovery
4. **Multi-factor authentication** - 2FA podrška
5. **Payment integration** - Stripe/PayPal za plaćanje
6. **Video streaming** - Integracija sa Vimeo/YouTube
7. **Real-time chat** - WebSocket za instant komunikaciju
8. **Mobile app** - React Native ili Cordova build
9. **Admin panel** - CMS za upravljanje sadržajem
10. **Analytics** - Praćenje napretka studenata

### Tehnička Poboljšanja
- **Redis caching** za bolje performanse
- **CDN integration** za static assets
- **Monitoring** - Prometheus/Grafana
- **Testing** - Unit i integration testovi
- **CI/CD pipeline** - GitHub Actions

## 🤝 Kontakt i Podrška

**Developer:** Lazar Davidović  
**Email:** lazar.davidovic98@gmail.com  
**GitHub:** [repository-link]

## 📄 Licenca

Ovaj projekat je napravljen za edukacijske svrhe. Sva prava zadržana.

---

**🎯 Matematika App - Vaš put ka razumevanju matematike! 📚✨**
