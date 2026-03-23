'use client';

import { useEffect } from 'react';

type Props = {
  adId: string;
};

export function ImpressionTracker({ adId }: Props) {
  useEffect(() => {
    fetch(`/api/ads/${adId}/impression`, {
      method: 'POST'
    }).catch(() => {
      // no-op for MVP
    });
  }, [adId]);

  return null;
}
