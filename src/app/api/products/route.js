import { sql, ensureTable } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await ensureTable();
    const data = await sql`SELECT * FROM products ORDER BY sort_order ASC, created_at ASC`;
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(req) {
  // Add authentication logic here if needed, similar to OFFICEHOUSE
  try {
    const body = await req.json();
    
    // Auto-generate ID logic (simplified for now)
    const allIds = await sql`SELECT id FROM products WHERE id ~ '^[0-9]+$'`;
    let maxId = 0;
    for (const row of allIds) {
      const num = parseInt(row.id, 10);
      if (!isNaN(num) && num > maxId) maxId = num;
    }
    const id = String(maxId + 1);
    
    const imagesVal = Array.isArray(body.images) ? JSON.stringify(body.images) : (body.images || '[]');
    const nextSortRes = await sql`SELECT COALESCE(MAX(sort_order), 0) + 1 AS next_sort FROM products`;
    const nextSort = nextSortRes[0]?.next_sort || 1;

    await sql`INSERT INTO products (id, name, slug, brand, categories, image, images, width, height, depth, colors, price, off, sort_order)
      VALUES (${id}, ${body.name}, ${body.slug || ''}, ${body.brand || ''}, ${body.categories || ''},
              ${body.image || ''}, ${imagesVal}, ${body.width || ''}, ${body.height || ''}, ${body.depth || ''}, ${body.colors || ''}, ${body.price || ''}, ${body.off || ''}, ${nextSort})`;
    
    return NextResponse.json({ success: true, id }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
