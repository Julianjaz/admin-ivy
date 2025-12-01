#!/bin/bash

echo "🔧 Corrigiendo archivo .env del backend..."

cat > backend/.env << 'EOF'
# Supabase Configuration
SUPABASE_URL=https://idulotykrcgpvgtjwjtn.supabase.co
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlkdWxvdHlrcmNncHZndGp3anRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE3MDUzNjUsImV4cCI6MjA0NzI4MTM2NX0.8iK8DVtJdHwZu0guXYthvvXRUP0HtAXwJ07kn1LX3bs

# Environment
ENVIRONMENT=development

# Port
PORT=8000
EOF

echo "✅ Archivo backend/.env corregido"
echo ""
echo "🔧 Configurando frontend/.env..."

cat > frontend/.env << 'EOF'
# API Configuration
VITE_API_URL=http://localhost:8000
EOF

echo "✅ Archivo frontend/.env creado"
echo ""
echo "✨ Configuración completada!"
