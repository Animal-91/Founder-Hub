'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useTransition } from 'react';

export default function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [isPending, startTransition] = useTransition();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    startTransition(() => {
      if (val) {
        router.push(`/explore?q=${encodeURIComponent(val)}`);
      } else {
        router.push('/explore');
      }
    });
  };

  return (
    <input 
      type="text" 
      value={query}
      onChange={handleSearch}
      placeholder="Search businesses..." 
      style={{ 
        padding: '0.75rem 1rem', 
        borderRadius: '8px', 
        border: '1px solid var(--border)', 
        backgroundColor: 'var(--card-bg)',
        color: 'var(--foreground)',
        width: '100%',
        maxWidth: '400px',
        fontSize: '1rem',
        outline: 'none',
        opacity: isPending ? 0.7 : 1
      }}
    />
  );
}
