'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import { BrandLogo } from '@/components/BrandLogo';

export default function GlobalErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to console for debugging
    console.error('App Router encountered an unhandled error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAF8F5] text-[#181715] px-6 text-center">
      <div className="mb-8">
        <BrandLogo variant="nav" />
      </div>
      <span className="text-xs font-sans tracking-[0.25em] text-[#B8936D] uppercase mb-3 font-semibold">
        SYSTEM NOTICE
      </span>
      <h1 className="font-serif text-3xl sm:text-4xl mb-4 font-normal text-[#181715]">
        Something went wrong
      </h1>
      <p className="font-sans text-xs sm:text-sm text-[#7A7061] max-w-md mb-8 leading-relaxed font-light">
        An error occurred while loading this section of the architectural archive.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={() => reset()}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#181715] text-white text-xs uppercase tracking-widest font-medium rounded-full transition-colors cursor-pointer border border-[#2D2A26] hover:border-[#CBB8A0] shadow-none"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Try Again</span>
        </button>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#EDE7DC] border border-[#DDD5C7] hover:border-[#CBB8A0] text-[#5C5346] hover:text-[#181715] text-xs uppercase tracking-widest font-medium rounded-full transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return Home</span>
        </Link>
      </div>
    </div>
  );
}
