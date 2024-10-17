// app/api/products/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const regularProducts = await prisma.products.findMany({
      where: { product_type: 'regular' },
    });

    const spareParts = await prisma.products.findMany({
      where: { product_type: 'spare_part' },
    });

    return NextResponse.json({ regularProducts, spareParts });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
