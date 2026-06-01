import { neon } from '@neondatabase/serverless';

const DATABASE_URL = process.env.DATABASE_URL || process.env.POSTGRES_URL || process.env.NEON_DATABASE_URL;

export const sql = neon(DATABASE_URL);

export async function ensureTable() {
  await sql`CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY, 
    name TEXT NOT NULL,
    slug TEXT, 
    brand TEXT, 
    categories TEXT, 
    image TEXT,
    images TEXT DEFAULT '[]',
    width TEXT DEFAULT '',
    height TEXT DEFAULT '',
    depth TEXT DEFAULT '',
    colors TEXT DEFAULT '',
    price TEXT DEFAULT '',
    off TEXT DEFAULT '',
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(), 
    updated_at TIMESTAMPTZ DEFAULT NOW()
  )`;
}
