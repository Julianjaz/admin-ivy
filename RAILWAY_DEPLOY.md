# 🚂 Guía de Deploy en Railway

## 📋 Pasos para Desplegar

### 1️⃣ Preparar el Repositorio

Asegúrate de que todo esté commiteado:

```bash
git add .
git commit -m "Ready for Railway deployment"
git push origin main
```

### 2️⃣ Crear Proyecto en Railway

1. Ve a [railway.app](https://railway.app)
2. Click en **"New Project"**
3. Selecciona **"Deploy from GitHub repo"**
4. Autoriza Railway a acceder a tu GitHub
5. Selecciona el repositorio `admin-ivy`

### 3️⃣ Configurar Backend

#### Crear Servicio Backend

1. En tu proyecto de Railway, click **"+ New"** → **"Service"**
2. Selecciona tu repositorio `admin-ivy`
3. Railway detectará que hay múltiples servicios

#### Configurar Settings del Backend

1. Click en el servicio que acabas de crear
2. Ve a **Settings** (⚙️)
3. Configura lo siguiente:

   **Root Directory:**
   ```
   backend
   ```

   **Variables de Entorno:**
   Click en **"Variables"** y agrega:
   ```
   SUPABASE_URL=https://idulotykrcgpvgtjwjtn.supabase.co
   SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlkdWxvdHlrcmNncHZndGp3anRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE3MDUzNjUsImV4cCI6MjA0NzI4MTM2NX0.8iK8DVtJdHwZu0guXYthvvXRUP0HtAXwJ07kn1LX3bs
   ENVIRONMENT=production
   ```

4. Railway detectará automáticamente el `Dockerfile` en `backend/`
5. Click en **"Deploy"**

### 4️⃣ Configurar Frontend

#### Crear Servicio Frontend

1. En tu proyecto de Railway, click **"+ New"** → **"Service"**
2. Selecciona tu repositorio `admin-ivy` nuevamente

#### Configurar Settings del Frontend

1. Click en el nuevo servicio
2. Ve a **Settings** (⚙️)
3. Configura:

   **Root Directory:**
   ```
   frontend
   ```

   **Variables de Entorno:**
   
   ⚠️ **IMPORTANTE:** Primero necesitas la URL del backend
   
   - Ve al servicio del backend
   - En **Settings** → **Networking** → copia la URL (ej: `https://backend-production-xxxx.up.railway.app`)
   - Vuelve al frontend
   - En **Variables** agrega:
   ```
   VITE_API_URL=https://tu-backend-url.up.railway.app
   ```
   (Reemplaza con la URL real de tu backend)

4. Click en **"Deploy"**

### 5️⃣ Verificar Deploy

#### Backend
1. Espera a que termine el deploy (verás un ✓ verde)
2. Click en el servicio backend
3. Ve a **Settings** → **Networking** → copia la URL
4. Abre en el navegador: `https://tu-backend.railway.app/docs`
5. Deberías ver la documentación de FastAPI

#### Frontend
1. Espera a que termine el deploy
2. Click en el servicio frontend
3. Ve a **Settings** → **Networking** → copia la URL
4. Abre en el navegador: `https://tu-frontend.railway.app`
5. Deberías ver tu dashboard con los datos de Supabase

## 🔧 Configuración Detallada

### Estructura del Proyecto en Railway

```
Railway Project: admin-ivy
├── Service 1: Backend
│   ├── Root Directory: backend
│   ├── Dockerfile: backend/Dockerfile
│   └── Variables:
│       ├── SUPABASE_URL
│       ├── SUPABASE_KEY
│       └── ENVIRONMENT=production
│
└── Service 2: Frontend
    ├── Root Directory: frontend
    ├── Dockerfile: frontend/Dockerfile
    └── Variables:
        └── VITE_API_URL=https://backend-url.railway.app
```

## 🐛 Solución de Problemas

### Error: "Dockerfile does not exist"

**Causa:** Railway no sabe en qué carpeta buscar

**Solución:**
1. Ve a Settings del servicio
2. En **Root Directory** escribe: `backend` o `frontend`
3. Guarda y redeploy

### Error: "Build failed"

**Backend:**
- Verifica que las variables de entorno estén configuradas
- Revisa los logs en Railway

**Frontend:**
- Asegúrate de que `VITE_API_URL` apunte a la URL correcta del backend
- La URL debe ser HTTPS (Railway la proporciona automáticamente)

### Error: "Application failed to respond"

**Backend:**
- Verifica que el Dockerfile use `$PORT` en el comando
- Railway asigna el puerto automáticamente

**Frontend:**
- Verifica que `package.json` tenga el script `start`
- Debe usar `vite preview` con el puerto de Railway

### CORS Error en Frontend

Si ves errores de CORS:

1. Ve al archivo `backend/app/core/config.py`
2. Agrega la URL de tu frontend de Railway a `ALLOWED_ORIGINS`:

```python
ALLOWED_ORIGINS: List[str] = [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://tu-frontend.railway.app",  # Agregar esta línea
]
```

3. Commit y push:
```bash
git add .
git commit -m "Add Railway frontend to CORS"
git push
```

Railway redesplegará automáticamente.

## 📊 Monitoreo

### Ver Logs

1. Click en el servicio (backend o frontend)
2. Ve a la pestaña **"Deployments"**
3. Click en el deployment activo
4. Verás los logs en tiempo real

### Métricas

1. Click en el servicio
2. Ve a **"Metrics"**
3. Verás:
   - CPU usage
   - Memory usage
   - Network traffic

## 🔄 Redeploy

Railway redespliega automáticamente cuando haces push a GitHub:

```bash
# Hacer cambios en el código
git add .
git commit -m "Update feature"
git push origin main
```

Railway detectará el push y redesplegará automáticamente.

### Redeploy Manual

1. Ve al servicio en Railway
2. Click en **"Deployments"**
3. Click en los 3 puntos (...) del deployment
4. Click en **"Redeploy"**

## 💰 Costos

Railway ofrece:
- **$5 USD gratis al mes** para nuevos usuarios
- Después: ~$5-10 USD/mes por servicio (dependiendo del uso)

## ✅ Checklist de Deploy

- [ ] Código pusheado a GitHub
- [ ] Proyecto creado en Railway
- [ ] Servicio Backend creado
  - [ ] Root Directory: `backend`
  - [ ] Variables de entorno configuradas
  - [ ] Deploy exitoso
  - [ ] URL del backend copiada
- [ ] Servicio Frontend creado
  - [ ] Root Directory: `frontend`
  - [ ] VITE_API_URL configurada con URL del backend
  - [ ] Deploy exitoso
- [ ] Frontend puede conectarse al backend
- [ ] Datos de Supabase se muestran correctamente

## 🎯 URLs Finales

Después del deploy tendrás:

- **Backend API:** `https://backend-production-xxxx.up.railway.app`
- **API Docs:** `https://backend-production-xxxx.up.railway.app/docs`
- **Frontend:** `https://frontend-production-xxxx.up.railway.app`

## 🔐 Seguridad

### Variables de Entorno

✅ **Correcto:** Configurar en Railway Dashboard
❌ **Incorrecto:** Hardcodear en el código

### Secretos

- Nunca commitees archivos `.env` a GitHub
- Usa las variables de entorno de Railway
- Rota las credenciales periódicamente

## 📚 Recursos

- [Railway Docs](https://docs.railway.app/)
- [Railway Discord](https://discord.gg/railway)
- [Railway Status](https://status.railway.app/)

---

**¿Necesitas ayuda?** Revisa los logs en Railway o contacta soporte.
