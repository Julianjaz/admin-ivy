#!/bin/bash

echo "🚂 Verificando configuración para Railway..."
echo ""

# Colores
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Verificar archivos necesarios
echo "📁 Verificando archivos..."

if [ -f "backend/Dockerfile" ]; then
    echo -e "${GREEN}✓${NC} backend/Dockerfile existe"
else
    echo -e "${RED}✗${NC} backend/Dockerfile NO existe"
fi

if [ -f "frontend/Dockerfile" ]; then
    echo -e "${GREEN}✓${NC} frontend/Dockerfile existe"
else
    echo -e "${RED}✗${NC} frontend/Dockerfile NO existe"
fi

if [ -f "backend/requirements.txt" ]; then
    echo -e "${GREEN}✓${NC} backend/requirements.txt existe"
else
    echo -e "${RED}✗${NC} backend/requirements.txt NO existe"
fi

if [ -f "frontend/package.json" ]; then
    echo -e "${GREEN}✓${NC} frontend/package.json existe"
else
    echo -e "${RED}✗${NC} frontend/package.json NO existe"
fi

echo ""
echo "🔍 Verificando configuración Railway..."

if [ -f "backend/railway.toml" ]; then
    echo -e "${GREEN}✓${NC} backend/railway.toml existe"
else
    echo -e "${YELLOW}⚠${NC} backend/railway.toml no existe (opcional)"
fi

if [ -f "frontend/railway.toml" ]; then
    echo -e "${GREEN}✓${NC} frontend/railway.toml existe"
else
    echo -e "${YELLOW}⚠${NC} frontend/railway.toml no existe (opcional)"
fi

echo ""
echo "📝 Contenido del Dockerfile del Backend:"
echo "---"
head -5 backend/Dockerfile
echo "..."
echo ""

echo "📝 Contenido del Dockerfile del Frontend:"
echo "---"
head -5 frontend/Dockerfile
echo "..."
echo ""

echo -e "${YELLOW}📋 Pasos para Railway:${NC}"
echo ""
echo "1. Asegúrate de hacer commit y push:"
echo "   git add ."
echo "   git commit -m 'Ready for Railway'"
echo "   git push origin main"
echo ""
echo "2. En Railway, para CADA servicio configura:"
echo ""
echo "   ${GREEN}Backend:${NC}"
echo "   - Root Directory: backend"
echo "   - Variables:"
echo "     SUPABASE_URL=https://idulotykrcgpvgtjwjtn.supabase.co"
echo "     SUPABASE_KEY=eyJhbGc..."
echo "     ENVIRONMENT=production"
echo ""
echo "   ${GREEN}Frontend:${NC}"
echo "   - Root Directory: frontend"
echo "   - Variables:"
echo "     VITE_API_URL=https://tu-backend.railway.app"
echo ""
echo -e "${GREEN}✨ Todo listo para Railway!${NC}"
echo ""
echo "Lee RAILWAY_DEPLOY.md para instrucciones detalladas."
