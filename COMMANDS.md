# 🎮 Comandos Útiles

Referencia rápida de comandos para trabajar con el proyecto.

## 🔍 Verificación

```bash
# Verificar estructura del proyecto
./verify.sh

# Ver archivos del proyecto
ls -R

# Contar líneas de código
find . -name "*.py" -o -name "*.jsx" | xargs wc -l
```

## 🐍 Backend (FastAPI)

### Setup Inicial
```bash
cd backend

# Crear entorno virtual
python -m venv venv

# Activar entorno virtual
source venv/bin/activate          # macOS/Linux
venv\Scripts\activate             # Windows

# Instalar dependencias
pip install -r requirements.txt

# Configurar variables de entorno
cp .env.example .env
nano .env  # o usa tu editor favorito
```

### Desarrollo
```bash
# Ejecutar servidor con hot reload
uvicorn app.main:app --reload

# Ejecutar en puerto específico
uvicorn app.main:app --reload --port 8080

# Ejecutar con host específico
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Ver logs detallados
uvicorn app.main:app --reload --log-level debug
```

### Testing
```bash
# Instalar pytest
pip install pytest pytest-asyncio httpx

# Ejecutar tests (cuando los crees)
pytest

# Con coverage
pytest --cov=app
```

### Mantenimiento
```bash
# Actualizar dependencias
pip install --upgrade -r requirements.txt

# Generar requirements.txt actualizado
pip freeze > requirements.txt

# Limpiar cache de Python
find . -type d -name __pycache__ -exec rm -r {} +
find . -type f -name "*.pyc" -delete
```

## ⚛️ Frontend (React + Vite)

### Setup Inicial
```bash
cd frontend

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
nano .env
```

### Desarrollo
```bash
# Ejecutar en modo desarrollo
npm run dev

# Ejecutar en puerto específico
npm run dev -- --port 3000

# Ejecutar con host específico
npm run dev -- --host 0.0.0.0
```

### Build y Preview
```bash
# Build para producción
npm run build

# Preview del build
npm run preview

# Preview en puerto específico
npm run preview -- --port 4000
```

### Mantenimiento
```bash
# Actualizar dependencias
npm update

# Verificar dependencias desactualizadas
npm outdated

# Limpiar node_modules y reinstalar
rm -rf node_modules package-lock.json
npm install

# Limpiar cache de npm
npm cache clean --force
```

## 🐳 Docker

### Desarrollo Local
```bash
# Build y ejecutar todo con Docker Compose
docker-compose up

# Ejecutar en background
docker-compose up -d

# Ver logs
docker-compose logs -f

# Detener servicios
docker-compose down

# Rebuild forzado
docker-compose up --build
```

### Backend Individual
```bash
cd backend

# Build imagen
docker build -t admin-ivy-backend .

# Ejecutar contenedor
docker run -p 8000:8000 \
  -e SUPABASE_URL=tu-url \
  -e SUPABASE_KEY=tu-key \
  admin-ivy-backend

# Con archivo .env
docker run -p 8000:8000 --env-file .env admin-ivy-backend
```

### Frontend Individual
```bash
cd frontend

# Build imagen
docker build -t admin-ivy-frontend .

# Ejecutar contenedor
docker run -p 3000:3000 \
  -e VITE_API_URL=http://localhost:8000 \
  admin-ivy-frontend
```

### Comandos Útiles Docker
```bash
# Ver contenedores corriendo
docker ps

# Ver todas las imágenes
docker images

# Eliminar contenedores parados
docker container prune

# Eliminar imágenes sin usar
docker image prune

# Limpiar todo (cuidado!)
docker system prune -a
```

## 🗄️ Supabase

### SQL Queries
```bash
# Conectar a Supabase CLI (si lo tienes instalado)
supabase db remote commit

# Backup de tabla
# (ejecutar en el SQL Editor de Supabase)
COPY suppliers TO '/tmp/suppliers_backup.csv' CSV HEADER;
```

### Queries Útiles
```sql
-- Ver todos los suppliers
SELECT * FROM suppliers;

-- Contar suppliers activos
SELECT COUNT(*) FROM suppliers WHERE status = 'active';

-- Últimos 10 suppliers creados
SELECT * FROM suppliers ORDER BY created_at DESC LIMIT 10;

-- Buscar por nombre
SELECT * FROM suppliers WHERE name ILIKE '%tech%';

-- Actualizar status
UPDATE suppliers SET status = 'inactive' WHERE id = 1;

-- Eliminar suppliers inactivos antiguos
DELETE FROM suppliers 
WHERE status = 'inactive' 
  AND created_at < NOW() - INTERVAL '90 days';
```

## 🚂 Railway

### Deploy con CLI
```bash
# Instalar Railway CLI
npm install -g @railway/cli

# Login
railway login

# Inicializar proyecto
railway init

# Deploy
railway up

# Ver logs
railway logs

# Abrir en navegador
railway open
```

### Variables de Entorno
```bash
# Listar variables
railway variables

# Agregar variable
railway variables set SUPABASE_URL=tu-url

# Eliminar variable
railway variables delete VARIABLE_NAME
```

## 🔧 Git

### Setup Inicial
```bash
# Inicializar repositorio (si no está inicializado)
git init

# Agregar remote
git remote add origin https://github.com/tu-usuario/admin-ivy.git

# Primer commit
git add .
git commit -m "Initial commit: Complete monitoring platform"
git push -u origin main
```

### Workflow Diario
```bash
# Ver estado
git status

# Ver cambios
git diff

# Agregar archivos
git add .

# Commit
git commit -m "feat: Add new feature"

# Push
git push

# Pull cambios
git pull

# Ver historial
git log --oneline
```

### Branches
```bash
# Crear nueva rama
git checkout -b feature/nueva-funcionalidad

# Cambiar de rama
git checkout main

# Merge rama
git merge feature/nueva-funcionalidad

# Eliminar rama
git branch -d feature/nueva-funcionalidad
```

## 🧪 Testing API

### Con cURL
```bash
# Health check
curl http://localhost:8000/health

# Get suppliers
curl http://localhost:8000/api/suppliers/

# Create supplier
curl -X POST http://localhost:8000/api/suppliers/ \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","status":"active"}'

# Update supplier
curl -X PUT http://localhost:8000/api/suppliers/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Updated","email":"updated@test.com","status":"active"}'

# Delete supplier
curl -X DELETE http://localhost:8000/api/suppliers/1
```

### Con HTTPie (más legible)
```bash
# Instalar HTTPie
pip install httpie

# Health check
http GET http://localhost:8000/health

# Get suppliers
http GET http://localhost:8000/api/suppliers/

# Create supplier
http POST http://localhost:8000/api/suppliers/ \
  name="Test" \
  email="test@test.com" \
  status="active"
```

## 📊 Monitoreo

### Logs
```bash
# Backend logs (si usas uvicorn)
tail -f logs/app.log

# Frontend logs (Vite)
# Los ves directamente en la terminal donde ejecutaste npm run dev

# Docker logs
docker-compose logs -f backend
docker-compose logs -f frontend
```

### Performance
```bash
# Ver uso de recursos
docker stats

# Ver procesos Python
ps aux | grep python

# Ver procesos Node
ps aux | grep node
```

## 🔒 Seguridad

### Variables de Entorno
```bash
# Nunca commitear archivos .env
echo ".env" >> .gitignore

# Verificar que .env no está en git
git ls-files | grep .env

# Rotar credenciales de Supabase
# 1. Generar nuevas en Supabase dashboard
# 2. Actualizar .env local
# 3. Actualizar en Railway
```

## 🎯 Atajos Útiles

### Crear alias en ~/.zshrc o ~/.bashrc
```bash
# Backend
alias backend-dev="cd backend && source venv/bin/activate && uvicorn app.main:app --reload"
alias backend-test="cd backend && source venv/bin/activate && pytest"

# Frontend
alias frontend-dev="cd frontend && npm run dev"
alias frontend-build="cd frontend && npm run build"

# Docker
alias dc-up="docker-compose up"
alias dc-down="docker-compose down"
alias dc-logs="docker-compose logs -f"

# Git
alias gs="git status"
alias ga="git add ."
alias gc="git commit -m"
alias gp="git push"
```

## 📱 Comandos Rápidos por Tarea

### Empezar a trabajar
```bash
# Terminal 1: Backend
cd backend && source venv/bin/activate && uvicorn app.main:app --reload

# Terminal 2: Frontend
cd frontend && npm run dev
```

### Deploy completo
```bash
# Verificar todo
./verify.sh

# Commit y push
git add .
git commit -m "Update: descripción"
git push

# Railway desplegará automáticamente
```

### Limpiar todo
```bash
# Limpiar Python
find . -type d -name __pycache__ -exec rm -r {} +
find . -type f -name "*.pyc" -delete

# Limpiar Node
rm -rf frontend/node_modules
rm -rf frontend/dist

# Limpiar Docker
docker-compose down
docker system prune -a
```

## 💡 Tips

1. **Usa tmux o screen** para múltiples terminales
2. **Configura alias** para comandos frecuentes
3. **Usa .env.local** para configuración personal
4. **Mantén logs** para debugging
5. **Haz commits frecuentes** con mensajes descriptivos

---

**Tip Pro:** Guarda este archivo en favoritos para referencia rápida!
