import Image from 'next/image';
import Link from 'next/link';

type Props = {
  ad: {
    id: string;
    title: string;
    description: string;
    image_url: string;
    category: string;
    clickCount: number;
  };
};

export function AdCard({ ad }: Props) {
  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
      <div className="relative h-44 w-full">
        <Image src={ad.image_url} alt={ad.title} fill className="object-cover" />
      </div>
      <div className="space-y-3 p-4">
        <div className="flex items-center justify-between gap-2">
          <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">{ad.category}</span>
          <span className="text-xs text-slate-500">🔥 {ad.clickCount} clicks</span>
        </div>
        <h2 className="line-clamp-2 text-lg font-semibold text-slate-900">{ad.title}</h2>
        <p className="line-clamp-2 text-sm text-slate-600">{ad.description}</p>
        <Link
          href={`/ad/${ad.id}`}
          className="inline-flex items-center text-sm font-semibold text-indigo-700 hover:text-indigo-800"
        >
          View deal →
        </Link>
      </div>
    </article>
  );
}
