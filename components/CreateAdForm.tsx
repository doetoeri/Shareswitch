'use client';

import { useState } from 'react';

type Props = {
  categories: string[];
};

export function CreateAdForm({ categories }: Props) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      title: String(formData.get('title') ?? ''),
      description: String(formData.get('description') ?? ''),
      image_url: String(formData.get('image_url') ?? ''),
      link: String(formData.get('link') ?? ''),
      category: String(formData.get('category') ?? '')
    };

    const response = await fetch('/api/ads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      form.reset();
      setMessage('Ad published successfully. It now appears in the main feed.');
    } else {
      const error = await response.json();
      setMessage(error.error ?? 'Unable to publish ad.');
    }

    setLoading(false);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="grid gap-4 sm:grid-cols-2">
        <input name="title" required placeholder="Ad title" className="rounded-xl border px-3 py-2 text-sm" />
        <select name="category" required className="rounded-xl border px-3 py-2 text-sm">
          <option value="">Select category</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <textarea
        name="description"
        required
        placeholder="Description"
        rows={4}
        className="w-full rounded-xl border px-3 py-2 text-sm"
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <input name="image_url" type="url" required placeholder="Image URL" className="rounded-xl border px-3 py-2 text-sm" />
        <input name="link" type="url" required placeholder="Destination link" className="rounded-xl border px-3 py-2 text-sm" />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
      >
        {loading ? 'Publishing...' : 'Publish ad'}
      </button>
      {message ? <p className="text-sm text-slate-600">{message}</p> : null}
    </form>
  );
}
