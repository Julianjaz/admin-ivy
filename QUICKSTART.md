# ⚡ Quick Start - 5 Minutos

## 1️⃣ Supabase (2 minutos)

1. Ve a https://supabase.com → Sign up
2. Create new project
3. SQL Editor → New query → Pega esto:

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

INSERT INTO suppliers (name, email, phone, status) VALUES
  ('Tech Solutions', 'contact@tech.com', '+1234567890', 'active'),
  ('Global Supplies', 'info@global.com', '+0987654321', 'active');
```

4. Settings → API → Copia:
   - Project URL
   - anon public key

## 2️⃣ Backend (1 minuto)

```bash
cd backend
cp .env.example .env
# Pega tus credenciales en .env

python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

✅ Backend: http://localhost:8000/docs

## 3️⃣ Frontend (1 minuto)

Nueva terminal:

```bash
cd frontend
cp .env.example .env
# Edita VITE_API_URL=http://localhost:8000

npm install
npm run dev
```

✅ App: http://localhost:5173

## 4️⃣ Verifica

Abre http://localhost:5173 - Deberías ver:
- ✅ API Status: healthy
- ✅ Total Suppliers: 2
- ✅ Tabla con tus suppliers

## 🚂 Deploy a Railway (Opcional)

```bash
# 1. Push a GitHub
git add .
git commit -m "Initial commit"
git push

# 2. Railway.app → New Project → Deploy from GitHub
# 3. Agrega 2 servicios:
#    - Backend (root: backend)
#    - Frontend (root: frontend)
# 4. Agrega variables de entorno en cada uno
```

## ❓ Problemas?

```bash
# Verifica la estructura
./verify.sh

# Backend no conecta a Supabase?
# → Revisa .env en backend/

# Frontend no muestra datos?
# → Revisa .env en frontend/
# → Verifica que backend esté corriendo
```

## 📚 Más Info

- [SETUP.md](./SETUP.md) - Guía detallada
- [README.md](./README.md) - Documentación completa
