import { NextResponse } from 'next/server';
import { getOrders, createOrder } from '@/lib/data';

export async function GET() {
  try {
    const orders = getOrders();
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ error: 'Kunde inte hämta ordrar' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const order = createOrder(body);
    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Kunde inte skapa order' }, { status: 500 });
  }
}
