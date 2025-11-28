'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '../../services/authService';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const authenticated = authService.checkAuth();
    setIsAuthenticated(authenticated);
    setIsChecking(false);
  }, []);

  useEffect(() => {
    if (!isChecking) {
      if (isAuthenticated) {
        router.push('/admin/dashboard');
      } else {
        router.push('/admin/login');
      }
    }
  }, [isAuthenticated, isChecking, router]);

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      fontSize: '16px',
      color: '#666'
    }}>
      Loading...
    </div>
  );
}
