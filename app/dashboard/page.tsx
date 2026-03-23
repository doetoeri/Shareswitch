import { CreateAdForm } from '@/components/CreateAdForm';
import { categories, getAds } from '@/lib/db';

export default function DashboardPage() {
  const ads = getAds();

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
      <section className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Advertiser Dashboard</h1>
        <p className="text-slate-600">Create content-style ads that users can discover through search and categories.</p>
      </section>

      <CreateAdForm categories={categories} />

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 p-4">
          <h2 className="font-semibold">Performance Snapshot (smart ranking)</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-slate-600">Title</th>
                <th className="px-4 py-3 text-left font-medium text-slate-600">Category</th>
                <th className="px-4 py-3 text-left font-medium text-slate-600">Clicks</th>
                <th className="px-4 py-3 text-left font-medium text-slate-600">Impressions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {ads.map((ad) => (
                <tr key={ad.id}>
                  <td className="px-4 py-3">{ad.title}</td>
                  <td className="px-4 py-3">{ad.category}</td>
                  <td className="px-4 py-3">{ad.clickCount}</td>
                  <td className="px-4 py-3">{ad.impressionCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
