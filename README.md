# 📊 Monitoring Platform - Admin Ivy

Plataforma web de monitoreo completa con frontend en React y backend en FastAPI, conectada a Supabase.

## 🏗️ Estructura del Proyecto

```
admin-ivy/
├── backend/                 # API FastAPI
│   ├── app/
│   │   ├── api/            # Routers y endpoints
│   │   │   ├── router.py   # Router principal
│   │   │   └── suppliers.py # Endpoints de suppliers
│   │   ├── core/           # Configuración
│   │   │   └── config.py   # Settings y variables de entorno
│   │   ├── models/         # Schemas y modelos
│   │   │   └── schemas.py  # Pydantic schemas
│   │   └── main.py         # Aplicación principal
│   ├── Dockerfile          # Docker para backend
│   ├── requirements.txt    # Dependencias Python
│   └── .env.example        # Variables de entorno ejemplo
│
└── frontend/               # Aplicación React
    ├── src/
    │   ├── components/     # Componentes React
    │   │   ├── Navbar.jsx
    │   │   └── Navbar.css
    │   ├── pages/          # Páginas
    │   │   ├── Dashboard.jsx
    │   │   └── Dashboard.css
    │   ├── services/       # Servicios API
    │   │   └── api.js
    │   ├── App.jsx
    │   ├── App.css
    │   ├── main.jsx
    │   └── index.css
    ├── Dockerfile          # Docker para frontend
    ├── package.json        # Dependencias Node
    ├── vite.config.js      # Configuración Vite
    └── .env.example        # Variables de entorno ejemplo
```

## 🚀 Ejecución Local

### Prerrequisitos

- Python 3.11+
- Node.js 18+
- Cuenta de Supabase (https://supabase.com)

### Backend (FastAPI)

1. **Navegar al directorio del backend:**
   ```bash
   cd backend
   ```

2. **Crear entorno virtual:**
   ```bash
   python -m venv venv
   source venv/bin/activate  # En Windows: venv\Scripts\activate
   ```

3. **Instalar dependencias:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configurar variables de entorno:**
   ```bash
   cp .env.example .env
   ```
   
   Editar `.env` con tus credenciales de Supabase:
   ```env
   SUPABASE_URL=https://tu-proyecto.supabase.co
   SUPABASE_KEY=tu-anon-key
   ENVIRONMENT=development
   PORT=8000
   ```

5. **Ejecutar el servidor:**
   ```bash
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

6. **Acceder a la documentación:**
   - API Docs: http://localhost:8000/docs
   - Health Check: http://localhost:8000/health

### Frontend (React + Vite)

1. **Navegar al directorio del frontend:**
   ```bash
   cd frontend
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno:**
   ```bash
   cp .env.example .env
   ```
   
   Editar `.env`:
   ```env
   VITE_API_URL=http://localhost:8000
   ```

4. **Ejecutar en modo desarrollo:**
   ```bash
   npm run dev
   ```

5. **Acceder a la aplicación:**
   - Frontend: http://localhost:5173

## 🐳 Ejecución con Docker

### Backend
```bash
cd backend
docker build -t monitoring-backend .
docker run -p 8000:8000 \
  -e SUPABASE_URL=tu-url \
  -e SUPABASE_KEY=tu-key \
  monitoring-backend
```

### Frontend
```bash
cd frontend
docker build -t monitoring-frontend .
docker run -p 3000:3000 \
  -e VITE_API_URL=http://localhost:8000 \
  monitoring-frontend
```

## 🚂 Deploy en Railway

### Preparación

1. **Crear cuenta en Railway:** https://railway.app
2. **Instalar Railway CLI (opcional):**
   ```bash
   npm install -g @railway/cli
   ```

### Deploy del Backend

1. **Crear nuevo proyecto en Railway**
2. **Conectar tu repositorio de GitHub**
3. **Configurar el servicio:**
   - Root Directory: `backend`
   - Build Command: (automático con Dockerfile)
   - Start Command: (automático con Dockerfile)

4. **Agregar variables de entorno en Railway:**
   ```
   SUPABASE_URL=https://tu-proyecto.supabase.co
   SUPABASE_KEY=tu-anon-key
   ENVIRONMENT=production
   ```

5. **Railway detectará automáticamente el Dockerfile y desplegará**

### Deploy del Frontend

1. **Crear otro servicio en el mismo proyecto**
2. **Configurar el servicio:**
   - Root Directory: `frontend`
   - Build Command: (automático con Dockerfile)
   - Start Command: (automático con Dockerfile)

3. **Agregar variables de entorno:**
   ```
   VITE_API_URL=https://tu-backend.railway.app
   ```

4. **Railway desplegará automáticamente**

### Configuración de Dominios

Railway te proporcionará URLs automáticas:
- Backend: `https://tu-backend.railway.app`
- Frontend: `https://tu-frontend.railway.app`

Actualiza la variable `VITE_API_URL` del frontend con la URL real del backend.

## 📊 Configuración de Supabase

### Crear tabla de ejemplo (Suppliers)

Ejecuta este SQL en el editor de Supabase:

```sql
-- Crear tabla suppliers
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

-- Insertar datos de ejemplo
INSERT INTO suppliers (name, email, phone, address, status) VALUES
  ('Proveedor A', 'contacto@proveedora.com', '+1234567890', 'Calle 123', 'active'),
  ('Proveedor B', 'info@proveedorb.com', '+0987654321', 'Avenida 456', 'active'),
  ('Proveedor C', 'ventas@proveedorc.com', '+1122334455', 'Plaza 789', 'inactive');

-- Crear función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Crear trigger
CREATE TRIGGER update_suppliers_updated_at
  BEFORE UPDATE ON suppliers
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

### Obtener credenciales

1. Ve a Settings > API en tu proyecto de Supabase
2. Copia:
   - `Project URL` → SUPABASE_URL
   - `anon/public key` → SUPABASE_KEY

## 🔧 Características Implementadas

### Backend
- ✅ Estructura modular con routers, services y schemas
- ✅ Conexión a Supabase
- ✅ CRUD completo para Suppliers
- ✅ Health check endpoint
- ✅ Configuración con variables de entorno
- ✅ CORS configurado
- ✅ Documentación automática (FastAPI Swagger)
- ✅ Dockerfile listo para Railway

### Frontend
- ✅ React 18 con Vite
- ✅ Routing con React Router
- ✅ Navbar responsive
- ✅ Dashboard con métricas
- ✅ Tabla de suppliers
- ✅ Servicio API con Axios
- ✅ Estilos modernos y responsive
- ✅ Manejo de errores
- ✅ Dockerfile listo para Railway

## 📝 Próximos Pasos

Esta es una base sólida para expandir. Puedes agregar:

1. **Autenticación y Autorización**
   - Integrar Supabase Auth
   - Roles y permisos
   - Protected routes

2. **Dashboards Avanzados**
   - Gráficos con Chart.js o Recharts
   - Métricas en tiempo real
   - Filtros y búsqueda avanzada

3. **Alertas y Notificaciones**
   - WebSockets para notificaciones en tiempo real
   - Sistema de alertas configurables
   - Email notifications

4. **Monitoreo de Métricas**
   - Integración con servicios de métricas
   - Logs centralizados
   - Performance monitoring

5. **Más Entidades**
   - Productos
   - Órdenes
   - Clientes
   - Inventario

## 🛠️ Tecnologías Utilizadas

### Backend
- **FastAPI** - Framework web moderno y rápido
- **Supabase** - Base de datos PostgreSQL y servicios backend
- **Pydantic** - Validación de datos
- **Uvicorn** - Servidor ASGI

### Frontend
- **React 18** - Librería UI
- **Vite** - Build tool y dev server
- **React Router** - Routing
- **Axios** - Cliente HTTP

### DevOps
- **Docker** - Containerización
- **Railway** - Platform as a Service para deploy

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 👥 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📞 Soporte

Si tienes preguntas o problemas, por favor abre un issue en el repositorio.
