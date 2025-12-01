# 🚀 Guía de Configuración Rápida

Esta guía te llevará paso a paso para tener el proyecto funcionando en minutos.

## ⚡ Inicio Rápido (5 minutos)

### 1. Clonar el repositorio
```bash
git clone <tu-repo-url>
cd admin-ivy
```

### 2. Configurar Supabase

1. Ve a [https://supabase.com](https://supabase.com) y crea una cuenta
2. Crea un nuevo proyecto
3. Ve a **SQL Editor** y ejecuta este script:

```sql
CREATE TABLE suppliers (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  address TEXT,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

INSERT INTO suppliers (name, email, phone, address, status) VALUES
  ('Proveedor A', 'contacto@proveedora.com', '+1234567890', 'Calle 123', 'active'),
  ('Proveedor B', 'info@proveedorb.com', '+0987654321', 'Avenida 456', 'active');
```

4. Ve a **Settings > API** y copia:
   - Project URL
   - anon/public key

### 3. Configurar Backend

```bash
cd backend
cp .env.example .env
```

Edita `backend/.env` y pega tus credenciales:
```env
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
ENVIRONMENT=development
PORT=8000
```

Instala dependencias y ejecuta:
```bash
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

✅ Backend corriendo en http://localhost:8000

### 4. Configurar Frontend

Abre otra terminal:
```bash
cd frontend
cp .env.example .env
```

Edita `frontend/.env`:
```env
VITE_API_URL=http://localhost:8000
```

Instala y ejecuta:
```bash
npm install
npm run dev
```

✅ Frontend corriendo en http://localhost:5173

### 5. ¡Listo! 🎉

Abre tu navegador en http://localhost:5173 y verás:
- Dashboard con estadísticas
- Lista de suppliers de tu base de datos
- API funcionando

## 🐳 Opción con Docker (Alternativa)

Si prefieres usar Docker:

```bash
# Crear archivo .env en la raíz
echo "SUPABASE_URL=tu-url" > .env
echo "SUPABASE_KEY=tu-key" >> .env

# Ejecutar todo con Docker Compose
docker-compose up
```

## 🚂 Deploy en Railway (10 minutos)

### Backend

1. Ve a [railway.app](https://railway.app) y crea cuenta
2. Click en "New Project" > "Deploy from GitHub repo"
3. Selecciona tu repositorio
4. Click en "Add variables":
   ```
   SUPABASE_URL=tu-url
   SUPABASE_KEY=tu-key
   ENVIRONMENT=production
   ```
5. En Settings:
   - Root Directory: `backend`
   - Railway detectará el Dockerfile automáticamente
6. Copia la URL generada (ej: `https://backend-production-xxxx.up.railway.app`)

### Frontend

1. En el mismo proyecto, click "New Service"
2. Selecciona el mismo repositorio
3. Click en "Add variables":
   ```
   VITE_API_URL=https://tu-backend-url.railway.app
   ```
4. En Settings:
   - Root Directory: `frontend`
5. ¡Listo! Tu app está en producción

## 🔍 Verificación

### Backend
- Health: http://localhost:8000/health
- Docs: http://localhost:8000/docs
- Suppliers: http://localhost:8000/api/suppliers/

### Frontend
- App: http://localhost:5173
- Debería mostrar los suppliers de tu DB

## ❓ Problemas Comunes

### Error: "Supabase credentials not configured"
- Verifica que copiaste bien las variables en `.env`
- Asegúrate de que el archivo `.env` está en `backend/`

### Error: "CORS policy"
- El backend debe estar corriendo en puerto 8000
- El frontend debe apuntar a `http://localhost:8000`

### Error: "Cannot find module"
- Backend: Activa el venv y ejecuta `pip install -r requirements.txt`
- Frontend: Ejecuta `npm install`

### La tabla está vacía
- Verifica que ejecutaste el SQL en Supabase
- Revisa que las credenciales sean correctas
- Verifica en Supabase > Table Editor que los datos existen

## 📚 Siguiente Paso

Lee el [README.md](./README.md) para información completa sobre:
- Estructura del proyecto
- Cómo agregar nuevas features
- Deploy avanzado
- Contribuir al proyecto
