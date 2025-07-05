export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const videos = await prisma.video.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(videos, { status: 200 });
  } catch (error) {
    console.error('Videos fetch error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
