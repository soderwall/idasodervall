import { NextResponse } from 'next/server';
import { getProducts, saveProduct } from '@/lib/data';

export async function GET() {
  try {
    const products = getProducts();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: 'Kunde inte hämta produkter' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const product = saveProduct(body);
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Kunde inte skapa produkt' }, { status: 500 });
  }
}
