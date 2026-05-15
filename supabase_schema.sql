-- ==============================================================================
-- KAMPUS ALKITAB - MULTI-TENANT DATABASE SCHEMA (SUPABASE)
-- Copy and run this script in your Supabase SQL Editor
-- ==============================================================================

-- 1. Enable pgcrypto for UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==========================================
-- 2. TABLES CREATION
-- ==========================================

-- A. Tenants (Gereja / Institusi Mitra penyewa Platform)
CREATE TABLE tenants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    subdomain VARCHAR(100) UNIQUE NOT NULL, -- e.g., 'gbirock', 'saddleback'
    is_active BOOLEAN DEFAULT true,
    
    -- Website Builder Configuration JSON
    -- Contoh isi: { "primaryColor": "#ff0000", "logoUrl": "...", "hideCommunity": false }
    theme_config JSONB DEFAULT '{}'::jsonb,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- B. Roles Enum
CREATE TYPE user_role AS ENUM (
    'superadmin',     -- Pengendali seluruh platform Kampus Alkitab
    'tenant_admin',   -- Admin operasional gereja cabang (Tenant)
    'lecturer',       -- Pengajar / Hamba Tuhan pembuat kelas
    'member'          -- Siswa / Jemaat
);

-- C. Extended User Profiles
-- (Secara default, auth data asli ada di auth.users Supabase)
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email VARCHAR(255) NOT NULL UNIQUE,
    full_name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20),
    avatar_url TEXT,
    
    -- RBAC & Multi-tenant Mapping
    role user_role DEFAULT 'member',
    tenant_id UUID REFERENCES tenants(id) ON DELETE SET NULL, -- Null berarti masuk melalui Kampus Alkitab Pusat
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- D. Categories & Courses
CREATE TABLE course_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    thumbnail_url TEXT,
    price DECIMAL(10,2) DEFAULT 0.00,  -- 0 berarti gratis
    
    -- Relasi
    author_id UUID REFERENCES profiles(id) ON DELETE RESTRICT,
    category_id UUID REFERENCES course_categories(id) ON DELETE SET NULL,
    
    -- Jika sebuah kelas dibuat spesifik untuk GBI tertentu dan tidak boleh dilihat umum
    is_global BOOLEAN DEFAULT true,
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    
    status VARCHAR(50) DEFAULT 'draft', -- draft, published, archived
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- E. Enrollments / Akses Kelas Siswa
CREATE TABLE enrollments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    progress_percentage INTEGER DEFAULT 0,
    enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(user_id, course_id)
);

-- ==========================================
-- 3. ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================
-- (Mengamankan agar data Gereja A tidak bisa diedit oleh Gereja B)

ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;

-- Tenants Policy
-- Semua orang bisa melihat tenant (untuk fetching tema web), tetapi hanya superadmin yang bisa ubah.
CREATE POLICY "Public profiles are viewable by everyone" ON tenants FOR SELECT USING (true);

-- Profiles Policy
-- Seseorang hanya dapat mengubah profilnya sendiri
CREATE POLICY "Users can insert their own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Courses Policy
-- Kelas global bisa dilihat semua. Kelas spesifik gereja hanya bisa dilihat jemaat gereja tersebut.
CREATE POLICY "View global or own tenant courses" ON courses FOR SELECT 
USING (
    is_global = true 
    OR tenant_id = (SELECT tenant_id FROM profiles WHERE id = auth.uid())
);

-- ==========================================
-- 4. TRIGGERS
-- ==========================================
-- Trigger otomatis membuat profile ketika user mendaftar di auth.users

CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'full_name', 'member');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- ==============================================================================
-- DONE! System ready for multi-tenant interactions.
-- ==============================================================================
