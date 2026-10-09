import { NextResponse } from 'next/server';
import { saveProduct, deleteProduct } from '@/lib/data';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const updated = saveProduct({ ...body, id });
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Kunde inte uppdatera produkt' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const success = deleteProduct(id);
    if (success) {
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ error: 'Produkt hittades inte' }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ error: 'Kunde inte radera produkt' }, { status: 500 });
  }
}
