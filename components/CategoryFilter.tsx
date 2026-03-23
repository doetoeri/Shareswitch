'use client';

import { useRouter, useSearchParams } from 'next/navigation';

type Props = {
  categories: string[];
};

export function CategoryFilter({ categories }: Props) {
  const router = useRouter();
  const params = useSearchParams();
  const selected = params.get('category') ?? 'All';

  const selectCategory = (category: string) => {
    const next = new URLSearchParams(params.toString());
    if (category === 'All') {
      next.delete('category');
    } else {
      next.set('category', category);
    }

    router.push(`/?${next.toString()}`);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {['All', ...categories].map((category) => {
        const active = category === selected;
        return (
          <button
            type="button"
            key={category}
            onClick={() => selectCategory(category)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              active ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
