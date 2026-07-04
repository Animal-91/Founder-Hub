'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useTransition, useEffect } from 'react';

export default function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [loc, setLoc] = useState(searchParams.get('loc') || '');
  const [isPending, startTransition] = useTransition();

  const handleSearch = (newQuery: string, newLoc: string) => {
    startTransition(() => {
      const params = new URLSearchParams();
      const currentCategory = searchParams.get('category');
      
      if (newQuery) {
        params.set('q', newQuery);
      }
      if (newLoc) {
        params.set('loc', newLoc);
      }
      if (currentCategory && currentCategory !== 'All') {
        params.set('category', currentCategory);
      }
      
      const newQueryString = params.toString();
      router.push(`/explore${newQueryString ? '?' + newQueryString : ''}`);
    });
  };

  return (
    <div style={{ display: 'flex', gap: '1rem', width: '100%', maxWidth: '600px', flexWrap: 'wrap' }}>
      <input 
        type="text" 
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          handleSearch(e.target.value, loc);
        }}
        placeholder="Search businesses, tags..." 
        style={{ 
          padding: '0.75rem 1rem', 
          borderRadius: '8px', 
          border: '1px solid var(--border)', 
          backgroundColor: 'var(--card-bg)',
          color: 'var(--foreground)',
          flex: '2 1 200px',
          fontSize: '1rem',
          outline: 'none',
          opacity: isPending ? 0.7 : 1
        }}
      />
      <input 
        type="text" 
        value={loc}
        onChange={(e) => {
          setLoc(e.target.value);
          handleSearch(query, e.target.value);
        }}
        placeholder="Location (e.g. Austin, TX)" 
        style={{ 
          padding: '0.75rem 1rem', 
          borderRadius: '8px', 
          border: '1px solid var(--border)', 
          backgroundColor: 'var(--card-bg)',
          color: 'var(--foreground)',
          flex: '1 1 150px',
          fontSize: '1rem',
          outline: 'none',
          opacity: isPending ? 0.7 : 1
        }}
      />
    </div>
  );
}
