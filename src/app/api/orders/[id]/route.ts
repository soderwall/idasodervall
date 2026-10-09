import { NextResponse } from 'next/server';
import { updateOrderStatus } from '@/lib/data';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const updated = updateOrderStatus(id, body.shippingStatus, body.paymentStatus);
    if (!updated) {
      return NextResponse.json({ error: 'Order hittades inte' }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Kunde inte uppdatera order' }, { status: 500 });
  }
}
