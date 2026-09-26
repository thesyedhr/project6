'use client';

import React, { useState, useEffect } from 'react';
import Image, { ImageProps } from 'next/image';
import { getClientSavedImage } from '@/lib/slots';

interface PremiumImageProps extends Omit<ImageProps, 'src' | 'onLoad'> {
  src?: string | null;
  slotId?: string;
  className?: string;
  containerClassName?: string;
  fitMode?: 'cover' | 'contain';
  allowUpload?: boolean;
}

export function PremiumImage({
  src,
  alt,
  slotId,
  className = '',
  containerClassName = '',
  fitMode = 'cover',
  fill,
  // Uploading disabled per request
  allowUpload = false,
  ...props
}: PremiumImageProps) {
  // Strictly lowercase serial number
  const formattedSlotId = slotId ? slotId.toLowerCase().trim() : null;

  const [isLoaded, setIsLoaded] = useState(false);
  const [clientSrc, setClientSrc] = useState<string | null>(() => {
    return formattedSlotId ? getClientSavedImage(formattedSlotId) : null;
  });

  // Listen for image updates in case an admin loads them
  useEffect(() => {
    if (!formattedSlotId) return;

    const handler = (e: Event) => {
      const customEvent = e as CustomEvent<{ slotId: string }>;
      if (customEvent.detail && customEvent.detail.slotId === formattedSlotId) {
        setClientSrc(getClientSavedImage(formattedSlotId));
      }
    };

    window.addEventListener('soulspace-image-updated', handler);
    return () => window.removeEventListener('soulspace-image-updated', handler);
  }, [formattedSlotId]);

  const activeSrc = clientSrc || src;
  const hasValidSrc = Boolean(
    activeSrc &&
    typeof activeSrc === 'string' &&
    activeSrc.trim().length > 0 &&
    !activeSrc.startsWith('/placeholder') &&
    activeSrc !== ''
  );

  return (
    <div
      className={`relative overflow-hidden bg-[#181715] flex items-center justify-center group ${containerClassName} ${
        fill ? 'w-full h-full' : ''
      }`}
    >
      {/* Visual Slot - active image or clean architectural background */}
      {!hasValidSrc ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-[#181715] select-none text-center">
          {/* Subtle architectural radial grid */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, #B8936D 1px, transparent 0)`,
              backgroundSize: '24px 24px',
            }}
          />
        </div>
      ) : (
        <>
          {!isLoaded && !clientSrc && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#181715]">
              <div className="w-full h-full bg-[#181715]" />
            </div>
          )}

          {/* If it's a data URL from client or an external URL */}
          {activeSrc?.startsWith('data:') ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={activeSrc}
              alt={alt || 'Soul Space development image'}
              className={`w-full h-full ${fitMode === 'contain' ? 'object-contain' : 'object-cover'} ${className}`}
            />
          ) : (
            <Image
              src={activeSrc as string}
              alt={alt || 'Soul Space development image'}
              fill={fill}
              onLoad={() => setIsLoaded(true)}
              className={`transition-all duration-700 ease-out ${
                fitMode === 'contain' ? 'object-contain' : 'object-cover'
              } ${
                isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.01]'
              } ${className}`}
              {...props}
            />
          )}
        </>
      )}
    </div>
  );
}
