# Frontend - Monitoring Platform

Aplicación React construida con Vite para el monitoreo de la plataforma.

## 📁 Estructura

```
frontend/
├── src/
│   ├── components/       # Componentes reutilizables
│   │   ├── Navbar.jsx
│   │   └── Navbar.css
│   ├── pages/           # Páginas/vistas
│   │   ├── Dashboard.jsx
│   │   └── Dashboard.css
│   ├── services/        # Servicios y API calls
│   │   └── api.js
│   ├── App.jsx          # Componente principal
│   ├── App.css
│   ├── main.jsx         # Punto de entrada
│   └── index.css        # Estilos globales
├── index.html           # HTML base
├── vite.config.js       # Configuración Vite
├── package.json         # Dependencias
└── Dockerfile           # Configuración Docker
```

## 🚀 Ejecutar Localmente

```bash
# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con la URL de tu backend

# Ejecutar en desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview
```

## 🎨 Componentes Principales

### Navbar
Barra de navegación responsive con enlaces a las diferentes secciones.

### Dashboard
Vista principal que muestra:
- Estado del API
- Métricas generales
- Lista de suppliers
- Manejo de errores

## 🔌 Servicios API

El archivo `services/api.js` centraliza todas las llamadas al backend:

```javascript
import { getSuppliers, createSupplier } from './services/api'

// Obtener suppliers
const suppliers = await getSuppliers()

// Crear supplier
const newSupplier = await createSupplier({
  name: "Nuevo Proveedor",
  email: "email@example.com"
})
```

## 🎯 Agregar Nuevas Páginas

### 1. Crear componente en `pages/`

```jsx
// src/pages/NewPage.jsx
import './NewPage.css'

function NewPage() {
  return (
    <div className="new-page">
      <h2>Nueva Página</h2>
    </div>
  )
}

export default NewPage
```

### 2. Agregar ruta en `App.jsx`

```jsx
import NewPage from './pages/NewPage'

<Routes>
  <Route path="/new-page" element={<NewPage />} />
</Routes>
```

### 3. Agregar link en `Navbar.jsx`

```jsx
<Link to="/new-page" className="nav-link">
  Nueva Página
</Link>
```

## 🎨 Estilos

El proyecto usa CSS modules. Cada componente tiene su propio archivo CSS.

Convenciones:
- Usa kebab-case para clases CSS
- Prefija componentes con su nombre
- Mantén estilos específicos en archivos separados

## 🐳 Docker

```bash
# Build
docker build -t monitoring-frontend .

# Run
docker run -p 3000:3000 \
  -e VITE_API_URL=http://localhost:8000 \
  monitoring-frontend
```

## 🌍 Variables de Entorno

| Variable | Descripción | Default |
|----------|-------------|---------|
| VITE_API_URL | URL del backend API | http://localhost:8000 |

**Nota:** Las variables deben tener el prefijo `VITE_` para ser accesibles en el código.

## 📦 Dependencias Principales

- **React 18** - Librería UI
- **React Router DOM** - Routing
- **Axios** - Cliente HTTP
- **Vite** - Build tool

## 🚀 Deploy

El proyecto está configurado para Railway con el script `start` en package.json que usa el puerto de la variable de entorno `PORT`.
