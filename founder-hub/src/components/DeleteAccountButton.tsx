'use client';

import { useState } from 'react';
import { deleteAccount } from '@/app/actions/deleteAccount';

export default function DeleteAccountButton() {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState('');

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This action is permanent and cannot be undone. All your profile data will be erased."
    );

    if (!confirmed) return;

    setIsDeleting(true);
    setError('');

    const res = await deleteAccount();
    if (res?.error) {
      setError(res.error);
      setIsDeleting(false);
    }
  };

  return (
    <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--border)' }}>
      <h3 style={{ color: '#ef4444', marginBottom: '0.5rem' }}>Danger Zone</h3>
      <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>
        Once you delete your account, there is no going back. Please be certain.
      </p>
      {error && <div style={{ color: '#ef4444', fontSize: '0.9rem', marginBottom: '1rem' }}>{error}</div>}
      <button 
        onClick={handleDelete}
        disabled={isDeleting}
        className="btn"
        style={{ 
          backgroundColor: '#ef4444', 
          color: 'white', 
          border: 'none',
          padding: '0.5rem 1rem',
          opacity: isDeleting ? 0.7 : 1,
          cursor: isDeleting ? 'not-allowed' : 'pointer'
        }}
      >
        {isDeleting ? 'Deleting...' : 'Delete Account'}
      </button>
    </div>
  );
}
