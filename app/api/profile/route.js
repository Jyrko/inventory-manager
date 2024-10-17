import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from "@/app/api/auth/[...nextauth]/route.js";
import { prisma } from '@/lib/prisma';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {

    const userProfile = await prisma.users.findUnique({
      where: {
        email: session.user.email,
      },
      select: {
        name: true,
        surname: true,
        email: true,
        role: true,
      },
    });

    console.log(userProfile);
    const roleName = await prisma.roles.findFirst({
      where: {
        id: userProfile?.role || 1
      },
      select: {
        role_name: true
      }
    });
    
    if (!userProfile) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    const userProfileWithRoleName = {
      ...userProfile,
      role: roleName?.name || 'Unknown',
    };
    console.log(userProfileWithRoleName);
    return NextResponse.json(userProfileWithRoleName);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 });
  }
}
