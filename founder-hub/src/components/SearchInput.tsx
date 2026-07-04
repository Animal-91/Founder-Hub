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
      const params = new URLSearchParams();
      const currentCategory = searchParams.get('category');
      
      if (val) {
        params.set('q', val);
      }
      if (currentCategory && currentCategory !== 'All') {
        params.set('category', currentCategory);
      }
      
      const newQueryString = params.toString();
      router.push(`/explore${newQueryString ? '?' + newQueryString : ''}`);
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
