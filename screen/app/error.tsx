// app/error.tsx
'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white via-blue-50 to-white p-6">
      <div className="text-center max-w-md">
        <div className="mb-6 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-lg">
            <span className="text-2xl" role="img" aria-label="Cross">✝️</span>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-slate-800 mb-4">
          Something went wrong
        </h1>
        
        <p className="text-slate-600 mb-6">
          "The Lord is near to all who call on Him." — Psalm 145:18
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="rounded-2xl bg-primary px-6 py-3 text-white font-semibold shadow-md transition hover:scale-105 hover:opacity-90"
          >
            Try Again
          </button>
          
          <Link
            href="/"
            className="rounded-2xl border border-slate-300 px-6 py-3 font-semibold text-slate-600 transition hover:bg-slate-100"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
}