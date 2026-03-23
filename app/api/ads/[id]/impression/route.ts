import { NextResponse } from 'next/server';
import { getAdById, recordImpression } from '@/lib/db';

type Context = {
  params: Promise<{ id: string }>;
};

export async function POST(_request: Request, context: Context) {
  const { id } = await context.params;
  const ad = getAdById(id);

  if (!ad) {
    return NextResponse.json({ error: 'Ad not found' }, { status: 404 });
  }

  recordImpression(id);
  return NextResponse.json({ success: true });
}
