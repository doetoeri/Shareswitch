import { randomUUID } from 'crypto';
import { Ad, AdCategory, Click, Impression } from '@/lib/types';

type Store = {
  ads: Ad[];
  clicks: Click[];
  impressions: Impression[];
};

declare global {
  // eslint-disable-next-line no-var
  var __adfinder_store: Store | undefined;
}

const seedAds: Ad[] = [
  {
    id: randomUUID(),
    title: '50% Off Wireless Earbuds',
    description:
      'Premium active-noise cancellation earbuds with 36h battery life. Limited-time launch offer.',
    image_url: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=1200',
    link: 'https://example.com/deals/wireless-earbuds',
    category: 'Tech',
    created_at: new Date().toISOString()
  },
  {
    id: randomUUID(),
    title: 'Pro Gaming Chair Bundle',
    description: 'Ergonomic gaming chair + footrest combo with free shipping this week.',
    image_url: 'https://images.unsplash.com/photo-1616588589676-62b3bd5f6f75?w=1200',
    link: 'https://example.com/deals/gaming-chair',
    category: 'Gaming',
    created_at: new Date().toISOString()
  },
  {
    id: randomUUID(),
    title: 'Plant Protein Starter Pack',
    description: 'Clean ingredients, 24g protein per scoop, and 20% off for first-time buyers.',
    image_url: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=1200',
    link: 'https://example.com/deals/protein-pack',
    category: 'Fitness',
    created_at: new Date().toISOString()
  }
];

const store: Store = globalThis.__adfinder_store ?? {
  ads: seedAds,
  clicks: [],
  impressions: []
};

globalThis.__adfinder_store = store;

export const categories: AdCategory[] = ['Tech', 'Fitness', 'Gaming', 'Beauty', 'Lifestyle'];

export function getAds(params?: { query?: string; category?: string }) {
  const query = params?.query?.trim().toLowerCase();
  const category = params?.category?.trim();

  const filtered = store.ads.filter((ad) => {
    const byQuery =
      !query ||
      ad.title.toLowerCase().includes(query) ||
      ad.description.toLowerCase().includes(query) ||
      ad.category.toLowerCase().includes(query);

    const byCategory = !category || category === 'All' || ad.category === category;

    return byQuery && byCategory;
  });

  return filtered
    .map((ad) => ({
      ...ad,
      clickCount: store.clicks.filter((click) => click.ad_id === ad.id).length,
      impressionCount: store.impressions.filter((imp) => imp.ad_id === ad.id).length
    }))
    .sort((a, b) => b.clickCount - a.clickCount || Date.parse(b.created_at) - Date.parse(a.created_at));
}

export function getAdById(id: string) {
  const ad = store.ads.find((item) => item.id === id);
  if (!ad) {
    return null;
  }

  return {
    ...ad,
    clickCount: store.clicks.filter((click) => click.ad_id === ad.id).length,
    impressionCount: store.impressions.filter((imp) => imp.ad_id === ad.id).length
  };
}

export function createAd(input: Omit<Ad, 'id' | 'created_at'>) {
  const ad: Ad = {
    id: randomUUID(),
    created_at: new Date().toISOString(),
    ...input
  };

  store.ads.unshift(ad);
  return ad;
}

export function recordImpression(ad_id: string, user_id?: string) {
  const impression: Impression = {
    id: randomUUID(),
    ad_id,
    timestamp: new Date().toISOString(),
    ...(user_id ? { user_id } : {})
  };
  store.impressions.push(impression);
  return impression;
}

export function recordClick(ad_id: string, user_id?: string) {
  const click: Click = {
    id: randomUUID(),
    ad_id,
    timestamp: new Date().toISOString(),
    ...(user_id ? { user_id } : {})
  };
  store.clicks.push(click);
  return click;
}
