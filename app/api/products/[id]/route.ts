// app/api/products/[id]/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';


export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const productId = Number(params.id);

  try {
    await prisma.products.delete({
      where: { id: productId },
    });
    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}


export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const productId = Number(params.id);
  const data = await req.json();

  try {
    const updatedProduct = await prisma.products.update({
      where: { id: productId },
      data: {
        name: data.name,
        price: Number(data.price),
        amount_in_stock: Number(data.amount),
        // category_id: Number(data.category),
        // lastUpdated: new Date(),
      },
    });
    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}