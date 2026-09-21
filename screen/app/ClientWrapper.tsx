// app/ClientWrapper.tsx
'use client';

import { useEffect, useState } from 'react';
import { Navbar } from './Components/Layout/Navbar';
import Loading from './loading';
import { Providers } from './Provider';
import Footer from './Components/Layout/Footer';
import { Toaster } from 'react-hot-toast';

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const visited = localStorage.getItem('visited');

    if (!visited) {
      setTimeout(() => {
        localStorage.setItem('visited', 'true');
        setLoading(false);
      }, 2500); // Reduced from 4000ms for better UX and SEO
    } else {
      setLoading(false);
    }
  }, []);

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Navbar />
      <Providers>
        <main id="main-content">
          {children}
        </main>
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
          }}
        />
      </Providers>
      <Footer />
    </>
  );
}