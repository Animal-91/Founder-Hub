'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';

const CATEGORIES = [
  "All",
  "SaaS",
  "Marketing",
  "Local Service",
  "Creator",
  "Real Estate",
  "E-commerce",
  "Health & Wellness",
  "Consulting",
];

export default function CategoryFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get('category') || 'All';
  const currentQuery = searchParams.get('q') || '';
  const [isPending, startTransition] = useTransition();

  const handleCategoryClick = (category: string) => {
    startTransition(() => {
      const params = new URLSearchParams();
      if (currentQuery) {
        params.set('q', currentQuery);
      }
      if (category !== 'All') {
        params.set('category', category);
      }
      
      const newQueryString = params.toString();
      router.push(`/explore${newQueryString ? '?' + newQueryString : ''}`);
    });
  };

  return (
    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '2rem', opacity: isPending ? 0.7 : 1 }}>
      {CATEGORIES.map((cat) => {
        const isActive = currentCategory === cat;
        return (
          <button
            key={cat}
            onClick={() => handleCategoryClick(cat)}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '20px',
              border: isActive ? '1px solid var(--primary)' : '1px solid var(--border)',
              backgroundColor: isActive ? 'var(--primary)' : 'var(--card-bg)',
              color: isActive ? 'white' : 'var(--foreground)',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: isActive ? 600 : 400,
              transition: 'all 0.2s ease',
            }}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}
