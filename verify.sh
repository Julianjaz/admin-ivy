#!/bin/bash

# Script de verificación del proyecto
echo "🔍 Verificando estructura del proyecto..."
echo ""

# Colores
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Función para verificar archivo
check_file() {
    if [ -f "$1" ]; then
        echo -e "${GREEN}✓${NC} $1"
        return 0
    else
        echo -e "${RED}✗${NC} $1 (faltante)"
        return 1
    fi
}

# Función para verificar directorio
check_dir() {
    if [ -d "$1" ]; then
        echo -e "${GREEN}✓${NC} $1/"
        return 0
    else
        echo -e "${RED}✗${NC} $1/ (faltante)"
        return 1
    fi
}

echo "📁 Verificando Backend..."
check_dir "backend"
check_dir "backend/app"
check_dir "backend/app/api"
check_dir "backend/app/core"
check_dir "backend/app/models"
check_file "backend/app/main.py"
check_file "backend/app/api/router.py"
check_file "backend/app/api/suppliers.py"
check_file "backend/app/core/config.py"
check_file "backend/app/models/schemas.py"
check_file "backend/requirements.txt"
check_file "backend/Dockerfile"
check_file "backend/.env.example"

echo ""
echo "📁 Verificando Frontend..."
check_dir "frontend"
check_dir "frontend/src"
check_dir "frontend/src/components"
check_dir "frontend/src/pages"
check_dir "frontend/src/services"
check_file "frontend/src/App.jsx"
check_file "frontend/src/main.jsx"
check_file "frontend/src/components/Navbar.jsx"
check_file "frontend/src/pages/Dashboard.jsx"
check_file "frontend/src/services/api.js"
check_file "frontend/package.json"
check_file "frontend/vite.config.js"
check_file "frontend/Dockerfile"
check_file "frontend/.env.example"

echo ""
echo "📁 Verificando archivos raíz..."
check_file "README.md"
check_file "SETUP.md"
check_file "docker-compose.yml"
check_file ".gitignore"

echo ""
echo -e "${YELLOW}📋 Próximos pasos:${NC}"
echo "1. Configurar Supabase y obtener credenciales"
echo "2. Copiar .env.example a .env en backend/ y frontend/"
echo "3. Ejecutar: cd backend && pip install -r requirements.txt"
echo "4. Ejecutar: cd frontend && npm install"
echo "5. Ver SETUP.md para instrucciones detalladas"
echo ""
echo -e "${GREEN}✨ Verificación completada!${NC}"
