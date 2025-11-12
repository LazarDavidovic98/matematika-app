#!/bin/bash

echo "🐳 Matematika App - Docker Setup"
echo "================================="

echo "📁 Cloning repository..."
git clone https://github.com/LazarDavidovic98/matematika-app.git
cd matematika-app

echo "📋 Checking files..."
ls -la

echo "🔍 Docker configuration:"
echo "------------------------"
head -20 docker-compose.yml

echo ""
echo "🚀 Starting application..."
echo "This will take 2-3 minutes the first time..."
echo ""

# Start the application
docker-compose up --build

echo ""
echo "🎉 Application should be running!"
echo "Check the ports above for access links."
