import { NextResponse } from 'next/server';
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json(); // Parse the request body

    // Destructure the product fields from the body
    const { name, brand, price, category, amount, itemWeight, description } = body;

    // Basic validation (can be expanded as necessary)
    if (!name || !brand || !price || !category || !amount || !itemWeight || !description) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Add the product to the database
    const newProduct = await prisma.products.create({
      data: {
        id: Math.floor(Math.random() * 10000000000), // FIXME: Replace with a proper ID generation strategy
        name,
        brand,
        price: parseFloat(price), 
        amount_in_stock: parseInt(amount),
        item_weight: parseFloat(itemWeight),
        description,
        category_id: parseInt(category), 
        product_type: 'regular', 
      },
    });

    // Return the newly created product
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error('Error adding product:', error);
    return NextResponse.json({ error: 'Unable to add product' }, { status: 500 });
  }
}
