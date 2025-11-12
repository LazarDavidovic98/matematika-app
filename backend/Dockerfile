# 🐳 BACKEND DOCKERFILE - INSTRUKCIJE ZA KREIRANJE PYTHON KONTEJNERA
# =====================================================================
# Svaki red u Dockerfile-u kreira novi "layer" u Docker image-u
# Multi-stage pattern optimizuje veličinu finalne slike

# 🐍 BASE IMAGE - Python 3.11 slim verzija (manja od full verzije)
FROM python:3.11-slim

# 🌍 ENVIRONMENT VARIJABLE za Python optimizaciju
# Python output se prikazuje u real-time (ne buffer-uje)
ENV PYTHONUNBUFFERED=1
# Ne kreira .pyc fajlove (čišći kontejner)
ENV PYTHONDONTWRITEBYTECODE=1

# 📁 RADNI DIREKTORIJUM unutar kontejnera
# Svi sledeći COPY i RUN komande će se izvršavati u /app folderu
WORKDIR /app

# 📦 INSTALIRANJE SYSTEM DEPENDENCIES
# apt-get update && install && cleanup u jednom RUN-u (manje layer-a)
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        build-essential \
        libpq-dev \
        curl \
    && rm -rf /var/lib/apt/lists/*

# 📋 COPY REQUIREMENTS PRVI (Docker layer caching optimizacija)
# Ako se kod menja a requirements.txt ne, ovaj layer se reuse-uje
COPY requirements.txt .

# 🔧 INSTALIRANJE PYTHON DEPENDENCIES
RUN pip install --no-cache-dir -r requirements.txt

# 📄 COPY APLIKACIJA KODA (poslednji korak)
# Ovo se menja često, pa je na kraju da ne invalidira cache iz prethodnih layer-a
COPY . .

# Create uploads directory
RUN mkdir -p uploads

# Create non-root user
RUN adduser --disabled-password --gecos '' appuser && chown -R appuser /app
USER appuser

# Expose port
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8000/health || exit 1

# Run the application
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
