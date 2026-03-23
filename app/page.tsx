import { AdCard } from '@/components/AdCard';
import { CategoryFilter } from '@/components/CategoryFilter';
import { SearchBar } from '@/components/SearchBar';
import { categories, getAds } from '@/lib/db';

type Props = {
  searchParams: Promise<{
    q?: string;
    category?: string;
  }>;
};

export default async function Home({ searchParams }: Props) {
  const { q, category } = await searchParams;
  const ads = getAds({ query: q, category });

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
      <section className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Discover curated deals and promotions</h1>
        <p className="text-slate-600">Explore content-style ads from brands you care about. Search, filter, and compare quickly.</p>
        <SearchBar />
        <CategoryFilter categories={categories} />
      </section>

      <section>
        {ads.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
            No matching ads found. Try a different search term.
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {ads.map((ad) => (
              <AdCard key={ad.id} ad={ad} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
