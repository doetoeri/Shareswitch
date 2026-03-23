import { NextResponse } from 'next/server';
import { getAdById, recordClick } from '@/lib/db';

type Context = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, context: Context) {
  const { id } = await context.params;
  const ad = getAdById(id);

  if (!ad) {
    return NextResponse.json({ error: 'Ad not found' }, { status: 404 });
  }

  recordClick(id);
  return NextResponse.redirect(ad.link);
}
