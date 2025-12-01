# 🔌 Ejemplos de Uso de la API

Ejemplos prácticos de cómo consumir la API desde diferentes clientes.

## 🌐 Base URL

- **Local:** `http://localhost:8000`
- **Railway:** `https://tu-backend.railway.app`

## 📡 Endpoints

### Health Check

Verifica que el servicio esté funcionando.

```bash
# cURL
curl http://localhost:8000/health

# HTTPie
http GET http://localhost:8000/health

# Respuesta
{
  "status": "healthy",
  "service": "monitoring-platform-api",
  "version": "1.0.0"
}
```

## 👥 Suppliers API

### Obtener todos los suppliers

```bash
# cURL
curl http://localhost:8000/api/suppliers/

# HTTPie
http GET http://localhost:8000/api/suppliers/

# JavaScript (Fetch)
fetch('http://localhost:8000/api/suppliers/')
  .then(res => res.json())
  .then(data => console.log(data))

# JavaScript (Axios)
axios.get('http://localhost:8000/api/suppliers/')
  .then(res => console.log(res.data))

# Python (requests)
import requests
response = requests.get('http://localhost:8000/api/suppliers/')
print(response.json())
```

**Respuesta:**
```json
[
  {
    "id": 1,
    "name": "Tech Solutions",
    "email": "contact@tech.com",
    "phone": "+1234567890",
    "address": "123 Tech Street",
    "status": "active",
    "created_at": "2024-01-01T10:00:00Z",
    "updated_at": "2024-01-01T10:00:00Z"
  }
]
```

### Obtener un supplier específico

```bash
# cURL
curl http://localhost:8000/api/suppliers/1

# HTTPie
http GET http://localhost:8000/api/suppliers/1

# JavaScript
const supplier = await fetch('http://localhost:8000/api/suppliers/1')
  .then(res => res.json())

# Python
response = requests.get('http://localhost:8000/api/suppliers/1')
supplier = response.json()
```

### Crear un nuevo supplier

```bash
# cURL
curl -X POST http://localhost:8000/api/suppliers/ \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New Supplier",
    "email": "new@supplier.com",
    "phone": "+1234567890",
    "address": "123 New Street",
    "status": "active"
  }'

# HTTPie
http POST http://localhost:8000/api/suppliers/ \
  name="New Supplier" \
  email="new@supplier.com" \
  phone="+1234567890" \
  address="123 New Street" \
  status="active"

# JavaScript (Fetch)
fetch('http://localhost:8000/api/suppliers/', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'New Supplier',
    email: 'new@supplier.com',
    phone: '+1234567890',
    address: '123 New Street',
    status: 'active'
  })
})

# JavaScript (Axios)
axios.post('http://localhost:8000/api/suppliers/', {
  name: 'New Supplier',
  email: 'new@supplier.com',
  phone: '+1234567890',
  address: '123 New Street',
  status: 'active'
})

# Python
import requests
data = {
    "name": "New Supplier",
    "email": "new@supplier.com",
    "phone": "+1234567890",
    "address": "123 New Street",
    "status": "active"
}
response = requests.post('http://localhost:8000/api/suppliers/', json=data)
```

### Actualizar un supplier

```bash
# cURL
curl -X PUT http://localhost:8000/api/suppliers/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Supplier",
    "email": "updated@supplier.com",
    "phone": "+0987654321",
    "address": "456 Updated Ave",
    "status": "active"
  }'

# HTTPie
http PUT http://localhost:8000/api/suppliers/1 \
  name="Updated Supplier" \
  email="updated@supplier.com"

# JavaScript
await fetch('http://localhost:8000/api/suppliers/1', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Updated Supplier',
    email: 'updated@supplier.com',
    phone: '+0987654321',
    address: '456 Updated Ave',
    status: 'active'
  })
})

# Python
data = {
    "name": "Updated Supplier",
    "email": "updated@supplier.com",
    "phone": "+0987654321",
    "address": "456 Updated Ave",
    "status": "active"
}
response = requests.put('http://localhost:8000/api/suppliers/1', json=data)
```

### Eliminar un supplier

```bash
# cURL
curl -X DELETE http://localhost:8000/api/suppliers/1

# HTTPie
http DELETE http://localhost:8000/api/suppliers/1

# JavaScript
await fetch('http://localhost:8000/api/suppliers/1', {
  method: 'DELETE'
})

# Python
response = requests.delete('http://localhost:8000/api/suppliers/1')
```

## 🔧 Usando desde el Frontend

### Servicio API (ya incluido en el proyecto)

```javascript
// src/services/api.js
import { getSuppliers, createSupplier, updateSupplier, deleteSupplier } from './services/api'

// Obtener todos
const suppliers = await getSuppliers()

// Crear nuevo
const newSupplier = await createSupplier({
  name: 'New Supplier',
  email: 'new@supplier.com',
  phone: '+1234567890',
  address: '123 Street',
  status: 'active'
})

// Actualizar
const updated = await updateSupplier(1, {
  name: 'Updated Name',
  email: 'updated@email.com'
})

// Eliminar
await deleteSupplier(1)
```

### En un componente React

```jsx
import { useState, useEffect } from 'react'
import { getSuppliers, createSupplier } from '../services/api'

function SuppliersPage() {
  const [suppliers, setSuppliers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadSuppliers()
  }, [])

  const loadSuppliers = async () => {
    try {
      const data = await getSuppliers()
      setSuppliers(data)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = async (formData) => {
    try {
      await createSupplier(formData)
      loadSuppliers() // Recargar lista
    } catch (error) {
      console.error('Error:', error)
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <div>
      <h1>Suppliers</h1>
      {suppliers.map(supplier => (
        <div key={supplier.id}>{supplier.name}</div>
      ))}
    </div>
  )
}
```

## 🧪 Testing con Postman

### Colección de Postman

Importa esta colección en Postman:

```json
{
  "info": {
    "name": "Monitoring Platform API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Health Check",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "{{base_url}}/health",
          "host": ["{{base_url}}"],
          "path": ["health"]
        }
      }
    },
    {
      "name": "Get All Suppliers",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "{{base_url}}/api/suppliers/",
          "host": ["{{base_url}}"],
          "path": ["api", "suppliers", ""]
        }
      }
    },
    {
      "name": "Create Supplier",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"name\": \"Test Supplier\",\n  \"email\": \"test@example.com\",\n  \"phone\": \"+1234567890\",\n  \"status\": \"active\"\n}"
        },
        "url": {
          "raw": "{{base_url}}/api/suppliers/",
          "host": ["{{base_url}}"],
          "path": ["api", "suppliers", ""]
        }
      }
    }
  ],
  "variable": [
    {
      "key": "base_url",
      "value": "http://localhost:8000"
    }
  ]
}
```

## 🐛 Manejo de Errores

### Errores Comunes

```javascript
try {
  const supplier = await getSupplier(999)
} catch (error) {
  if (error.response) {
    // Error de la API
    console.log(error.response.status) // 404
    console.log(error.response.data)   // { "detail": "Supplier not found" }
  } else if (error.request) {
    // No hubo respuesta
    console.log('No response from server')
  } else {
    // Error en la configuración
    console.log('Error:', error.message)
  }
}
```

### Códigos de Estado HTTP

| Código | Significado | Ejemplo |
|--------|-------------|---------|
| 200 | OK | Operación exitosa |
| 201 | Created | Recurso creado |
| 400 | Bad Request | Datos inválidos |
| 404 | Not Found | Recurso no encontrado |
| 500 | Server Error | Error interno del servidor |

## 📚 Documentación Interactiva

FastAPI genera documentación automática:

- **Swagger UI:** http://localhost:8000/docs
- **ReDoc:** http://localhost:8000/redoc

Desde ahí puedes:
- Ver todos los endpoints
- Probar las APIs directamente
- Ver los schemas de datos
- Descargar la especificación OpenAPI

## 🔐 Autenticación (Futuro)

Cuando agregues autenticación con Supabase:

```javascript
// Obtener token de Supabase
const { data: { session } } = await supabase.auth.getSession()
const token = session?.access_token

// Usar en requests
axios.get('http://localhost:8000/api/suppliers/', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
```

## 💡 Tips

1. **Variables de Entorno:** Usa `VITE_API_URL` en frontend para cambiar fácilmente entre local y producción
2. **Interceptors:** Configura interceptors en Axios para manejar errores globalmente
3. **Retry Logic:** Implementa reintentos automáticos para requests fallidos
4. **Caching:** Considera usar React Query o SWR para caching automático
5. **Rate Limiting:** Implementa throttling/debouncing en búsquedas y filtros
