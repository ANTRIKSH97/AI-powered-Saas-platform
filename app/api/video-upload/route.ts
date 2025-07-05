export const runtime = 'nodejs';


import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { auth } from '@clerk/nextjs/server';
import { PrismaClient } from '@prisma/client';
import { Readable } from 'stream';

const prisma = new PrismaClient();

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const originalSize = formData.get('originalSize') as string;

    if (!file || !title || !description) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const uploadResult = await new Promise<any>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          resource_type: 'video',
          folder: 'video-uploads',
          transformation: [{ quality: 'auto', fetch_format: 'mp4' }],
        },
        (error, result) => {
          if (error) {
            console.error('Cloudinary Stream Error:', error);
            reject(error);
          } else {
            resolve(result);
          }
        }
      );

      Readable.from(buffer).pipe(stream); // ✅ Proper streaming
    });

    const newVideo = await prisma.video.create({
      data: {
        title,
        description,
        originalSize,
        compressedSize: String(uploadResult.bytes),
        publicId: uploadResult.public_id,
        duration: uploadResult.duration || 0,
        userId,
      },
    });

    return NextResponse.json(newVideo, { status: 200 });
  } catch (error) {
    console.error('Video Upload Error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
