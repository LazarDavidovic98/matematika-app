# Matematika App - Online Docker Deployment

## 🚀 Opcije za Online Pokretanje

Pošto imamo problema sa lokalnim Docker Desktop-om, evo nekoliko načina da pokrenemo aplikaciju online:

### 1. GitHub Codespaces (Preporučeno)

1. **Idite na GitHub repozitorijum**: https://github.com/LazarDavidovic98/matematika-app
2. **Kliknite na "Code" > "Codespaces" > "Create codespace on main"**
3. **Sačekajte da se Codespace učita**
4. **U terminalu pokrenite**:
   ```bash
   docker-compose up --build
   ```

### 2. Play with Docker

1. **Idite na**: https://labs.play-with-docker.com/
2. **Login sa Docker Hub accountom**
3. **Kliknite "Start"**
4. **Dodajte novu instancu**
5. **Clone repozitorijum**:
   ```bash
   git clone https://github.com/LazarDavidovic98/matematika-app.git
   cd matematika-app
   docker-compose up --build
   ```

### 3. Katacoda Docker Playground

1. **Idite na**: https://www.katacoda.com/courses/docker/playground
2. **Pokrenite Docker playground**
3. **Clone i pokrenite**:
   ```bash
   git clone https://github.com/LazarDavidovic98/matematika-app.git
   cd matematika-app
   docker-compose up --build
   ```

### 4. GitPod

1. **Idite na**: https://gitpod.io/#https://github.com/LazarDavidovic98/matematika-app
2. **Automatski će se pokrenuti development environment**
3. **U terminalu**:
   ```bash
   docker-compose up --build
   ```

## 📋 Pre pokretanja

Aplikacija će biti dostupna na:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API dokumentacija**: http://localhost:8000/docs
- **Health check**: http://localhost:8000/health

## 🔧 Konfiguracija

Sve je već konfigurisano u:
- `docker-compose.yml` - Docker servisi
- `.devcontainer/devcontainer.json` - VS Code dev container
- `.github/workflows/deploy.yml` - CI/CD pipeline

## 🌐 Servisi

- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: FastAPI + Python
- **Database**: PostgreSQL
- **Proxy**: Nginx

## 📝 GitHub Actions

Pipeline automatski:
1. Testira kod
2. Builda Docker images
3. Pokreće aplikaciju
4. Testira endpoints
5. Deploy na staging/production

## 🆘 Troubleshooting

Ako ima problema:
1. Proverite da li su svi portovi slobodni
2. Proverite Docker logs: `docker-compose logs`
3. Restartujte servise: `docker-compose restart`
4. Rebuild: `docker-compose up --build --force-recreate`

## 📞 Kontakt

lazar.davidovic98@gmail.com
