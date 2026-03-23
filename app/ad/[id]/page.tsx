import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ImpressionTracker } from '@/components/ImpressionTracker';
import { getAdById } from '@/lib/db';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function AdDetailPage({ params }: Props) {
  const { id } = await params;
  const ad = getAdById(id);

  if (!ad) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <ImpressionTracker adId={ad.id} />
      <Link href="/" className="mb-5 inline-flex text-sm text-indigo-700 hover:text-indigo-800">
        ← Back to feed
      </Link>
      <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="relative h-72 w-full">
          <Image src={ad.image_url} alt={ad.title} fill className="object-cover" />
        </div>
        <div className="space-y-4 p-6">
          <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">{ad.category}</span>
          <h1 className="text-3xl font-bold text-slate-900">{ad.title}</h1>
          <p className="text-slate-700">{ad.description}</p>
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
            <span>👀 {ad.impressionCount} impressions</span>
            <span>🔥 {ad.clickCount} clicks</span>
          </div>
          <a
            href={`/api/ads/${ad.id}/click-redirect`}
            className="inline-flex rounded-xl bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-700"
          >
            Open deal
          </a>
        </div>
      </article>
    </div>
  );
}
