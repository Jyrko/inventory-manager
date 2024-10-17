import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const products = await prisma.products.findMany({
      skip: 0,
      take: undefined,
      orderBy: {
        created_at: 'desc',
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ error: "Unable to fetch products" }, { status: 500 });
  }
}
