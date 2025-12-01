# Backend - Monitoring Platform API

API REST construida con FastAPI y conectada a Supabase.

## 📁 Estructura

```
backend/
├── app/
│   ├── api/              # Endpoints y routers
│   │   ├── router.py     # Router principal que agrupa todos los endpoints
│   │   └── suppliers.py  # CRUD de suppliers
│   ├── core/             # Configuración central
│   │   └── config.py     # Settings y variables de entorno
│   ├── models/           # Schemas y modelos de datos
│   │   └── schemas.py    # Pydantic models para validación
│   └── main.py           # Punto de entrada de la aplicación
├── Dockerfile            # Configuración Docker
├── requirements.txt      # Dependencias Python
└── .env.example          # Ejemplo de variables de entorno
```

## 🚀 Ejecutar Localmente

```bash
# Crear entorno virtual
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Instalar dependencias
pip install -r requirements.txt

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales

# Ejecutar servidor
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## 📡 Endpoints Disponibles

### Health Check
- `GET /health` - Verifica el estado del servicio

### Suppliers
- `GET /api/suppliers/` - Obtener todos los suppliers
- `GET /api/suppliers/{id}` - Obtener un supplier específico
- `POST /api/suppliers/` - Crear nuevo supplier
- `PUT /api/suppliers/{id}` - Actualizar supplier
- `DELETE /api/suppliers/{id}` - Eliminar supplier

## 📖 Documentación

Una vez ejecutando, accede a:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## 🔧 Agregar Nuevos Endpoints

### 1. Crear Schema en `models/schemas.py`

```python
class NewEntityBase(BaseModel):
    name: str
    description: Optional[str] = None

class NewEntityCreate(NewEntityBase):
    pass

class NewEntity(NewEntityBase):
    id: int
    created_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True
```

### 2. Crear Router en `api/new_entity.py`

```python
from fastapi import APIRouter, HTTPException
from app.models.schemas import NewEntity, NewEntityCreate
from app.core.config import settings
from supabase import create_client

router = APIRouter()

@router.get("/", response_model=List[NewEntity])
async def get_entities():
    supabase = create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)
    response = supabase.table("new_entities").select("*").execute()
    return response.data
```

### 3. Registrar en `api/router.py`

```python
from app.api import new_entity

api_router.include_router(
    new_entity.router,
    prefix="/new-entities",
    tags=["new-entities"]
)
```

## 🐳 Docker

```bash
# Build
docker build -t monitoring-backend .

# Run
docker run -p 8000:8000 \
  -e SUPABASE_URL=your-url \
  -e SUPABASE_KEY=your-key \
  monitoring-backend
```

## 🌍 Variables de Entorno

| Variable | Descripción | Requerido |
|----------|-------------|-----------|
| SUPABASE_URL | URL de tu proyecto Supabase | Sí |
| SUPABASE_KEY | Anon/public key de Supabase | Sí |
| ENVIRONMENT | development/production | No |
| PORT | Puerto del servidor (default: 8000) | No |
