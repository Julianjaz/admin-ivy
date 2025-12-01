# 🗄️ Estructura de Base de Datos

Este documento describe la estructura de la base de datos en Supabase.

## 📊 Tablas Actuales

### `suppliers`

Tabla para gestionar proveedores.

| Campo | Tipo | Descripción | Constraints |
|-------|------|-------------|-------------|
| `id` | BIGSERIAL | ID único del proveedor | PRIMARY KEY |
| `name` | TEXT | Nombre del proveedor | NOT NULL |
| `email` | TEXT | Email de contacto | NULL |
| `phone` | TEXT | Teléfono de contacto | NULL |
| `address` | TEXT | Dirección física | NULL |
| `status` | TEXT | Estado (active/inactive) | DEFAULT 'active' |
| `created_at` | TIMESTAMP | Fecha de creación | DEFAULT NOW() |
| `updated_at` | TIMESTAMP | Fecha de actualización | DEFAULT NOW() |

#### Script SQL

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

-- Trigger para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_suppliers_updated_at
  BEFORE UPDATE ON suppliers
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

#### Datos de Ejemplo

```sql
INSERT INTO suppliers (name, email, phone, address, status) VALUES
  ('Tech Solutions Inc', 'contact@techsolutions.com', '+1-555-0101', '123 Tech Street, Silicon Valley', 'active'),
  ('Global Supplies Co', 'info@globalsupplies.com', '+1-555-0102', '456 Supply Ave, New York', 'active'),
  ('Premium Parts Ltd', 'sales@premiumparts.com', '+1-555-0103', '789 Parts Blvd, Chicago', 'active'),
  ('Quality Materials', 'contact@qualitymats.com', '+1-555-0104', '321 Material Lane, Boston', 'inactive');
```

## 🔮 Tablas Futuras Sugeridas

### `metrics`

Para almacenar métricas del sistema.

```sql
CREATE TABLE metrics (
  id BIGSERIAL PRIMARY KEY,
  metric_name TEXT NOT NULL,
  metric_value NUMERIC NOT NULL,
  metric_type TEXT, -- 'count', 'gauge', 'timer'
  tags JSONB, -- Metadata adicional
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_metrics_name ON metrics(metric_name);
CREATE INDEX idx_metrics_created_at ON metrics(created_at);
```

### `alerts`

Para gestionar alertas del sistema.

```sql
CREATE TABLE alerts (
  id BIGSERIAL PRIMARY KEY,
  alert_type TEXT NOT NULL, -- 'warning', 'error', 'info'
  title TEXT NOT NULL,
  message TEXT,
  severity TEXT DEFAULT 'medium', -- 'low', 'medium', 'high', 'critical'
  status TEXT DEFAULT 'active', -- 'active', 'acknowledged', 'resolved'
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  resolved_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_alerts_status ON alerts(status);
CREATE INDEX idx_alerts_severity ON alerts(severity);
```

### `users`

Para autenticación y permisos (usar Supabase Auth).

```sql
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  full_name TEXT,
  role TEXT DEFAULT 'viewer', -- 'admin', 'editor', 'viewer'
  department TEXT,
  preferences JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### `audit_logs`

Para rastrear cambios importantes.

```sql
CREATE TABLE audit_logs (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  action TEXT NOT NULL, -- 'create', 'update', 'delete'
  table_name TEXT NOT NULL,
  record_id BIGINT,
  old_values JSONB,
  new_values JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_audit_logs_user ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_table ON audit_logs(table_name);
```

## 🔐 Row Level Security (RLS)

Supabase recomienda habilitar RLS para seguridad:

```sql
-- Habilitar RLS en suppliers
ALTER TABLE suppliers ENABLE ROW LEVEL SECURITY;

-- Política: Todos pueden leer
CREATE POLICY "Enable read access for all users" ON suppliers
  FOR SELECT USING (true);

-- Política: Solo usuarios autenticados pueden insertar
CREATE POLICY "Enable insert for authenticated users only" ON suppliers
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Política: Solo usuarios autenticados pueden actualizar
CREATE POLICY "Enable update for authenticated users only" ON suppliers
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Política: Solo usuarios autenticados pueden eliminar
CREATE POLICY "Enable delete for authenticated users only" ON suppliers
  FOR DELETE USING (auth.role() = 'authenticated');
```

## 📈 Índices Recomendados

```sql
-- Para búsquedas por nombre
CREATE INDEX idx_suppliers_name ON suppliers(name);

-- Para filtros por status
CREATE INDEX idx_suppliers_status ON suppliers(status);

-- Para ordenar por fecha
CREATE INDEX idx_suppliers_created_at ON suppliers(created_at DESC);
```

## 🔄 Migraciones

Para agregar nuevas tablas:

1. Crea el SQL en el editor de Supabase
2. Guarda el script en `backend/migrations/`
3. Documenta los cambios aquí

## 🛠️ Mantenimiento

### Backup

Supabase hace backups automáticos, pero puedes hacer manuales:

```bash
# Usando pg_dump (requiere credenciales de Supabase)
pg_dump -h db.xxx.supabase.co -U postgres -d postgres > backup.sql
```

### Limpiar datos antiguos

```sql
-- Eliminar métricas antiguas (más de 90 días)
DELETE FROM metrics 
WHERE created_at < NOW() - INTERVAL '90 days';

-- Archivar alertas resueltas
UPDATE alerts 
SET status = 'archived' 
WHERE status = 'resolved' 
  AND resolved_at < NOW() - INTERVAL '30 days';
```

## 📚 Recursos

- [Supabase Docs](https://supabase.com/docs)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)
- [SQL Tutorial](https://www.postgresqltutorial.com/)
