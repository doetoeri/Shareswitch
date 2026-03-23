import { NextResponse } from 'next/server';
import { categories, createAd, getAds } from '@/lib/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q') ?? undefined;
  const category = searchParams.get('category') ?? undefined;

  return NextResponse.json({ ads: getAds({ query, category }) });
}

export async function POST(request: Request) {
  const body = await request.json();

  const title = String(body.title ?? '').trim();
  const description = String(body.description ?? '').trim();
  const image_url = String(body.image_url ?? '').trim();
  const link = String(body.link ?? '').trim();
  const category = String(body.category ?? '').trim();

  if (!title || !description || !image_url || !link || !category) {
    return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
  }

  if (!categories.includes(category as (typeof categories)[number])) {
    return NextResponse.json({ error: 'Invalid category.' }, { status: 400 });
  }

  const ad = createAd({
    title,
    description,
    image_url,
    link,
    category: category as (typeof categories)[number]
  });

  return NextResponse.json({ ad }, { status: 201 });
}
