'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export function SearchBar() {
  const router = useRouter();
  const params = useSearchParams();
  const [value, setValue] = useState(params.get('q') ?? '');

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const next = new URLSearchParams(params.toString());
    if (value.trim()) {
      next.set('q', value.trim());
    } else {
      next.delete('q');
    }

    router.push(`/?${next.toString()}`);
  };

  return (
    <form onSubmit={onSubmit} className="w-full">
      <label htmlFor="search" className="sr-only">
        Search ads
      </label>
      <input
        id="search"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Search ads, products, promotions..."
        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm shadow-sm outline-none ring-indigo-500 transition placeholder:text-slate-400 focus:ring"
      />
    </form>
  );
}
