export type AdCategory = 'Tech' | 'Fitness' | 'Gaming' | 'Beauty' | 'Lifestyle';

export type Ad = {
  id: string;
  title: string;
  description: string;
  image_url: string;
  link: string;
  category: AdCategory;
  created_at: string;
};

export type Impression = {
  id: string;
  ad_id: string;
  timestamp: string;
  user_id?: string;
};

export type Click = {
  id: string;
  ad_id: string;
  timestamp: string;
  user_id?: string;
};
