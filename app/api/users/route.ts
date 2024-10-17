
import { NextResponse } from "next/server";
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function GET() {
  try {
    const users = await prisma.users.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        created_at: true,
      },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}


export async function POST(req: Request) {
  const userData = await req.json();
  try {
    const role = await prisma.roles.findFirst({
      where: {
        id: Number(userData.role),
      },
    });
    const newUser = await prisma.users.create({
      data: {
        name: userData.name,
        role: role?.id || 1,
        email: userData.email,
        password: await bcrypt.hash(userData.password, 10),
        user_status: "active", 
      },
    });

    return NextResponse.json(newUser);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to add user" }, { status: 500 });
  }
}
