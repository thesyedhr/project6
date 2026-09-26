'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Maximize2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { getClientSavedImage } from '@/lib/slots';

export type SlotOrientation = 'landscape' | 'portrait' | 'square' | 'wide';

interface DynamicPictureSlotProps {
  slotId: string;
  title?: string;
  caption?: string;
  aspectHint?: string;
  orientation?: SlotOrientation;
  src?: string | null;
  className?: string;
  priority?: boolean;
}

export function DynamicPictureSlot({
  slotId,
  title,
  caption,
  aspectHint,
  orientation = 'landscape',
  src,
  className = '',
  priority = false,
}: DynamicPictureSlotProps) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  // Strictly lowercase serial number: e.g. aurum_img_01, abvarbor_img_02
  const serialNumber = slotId.toLowerCase().trim();

  // Support local client saved uploads when user uploads them
  const [clientSrc, setClientSrc] = useState<string | null>(() => {
    return getClientSavedImage(serialNumber);
  });

  useEffect(() => {
    const handler = (e: Event) => {
      const customEvent = e as CustomEvent<{ slotId: string }>;
      if (customEvent.detail && customEvent.detail.slotId === serialNumber) {
        setClientSrc(getClientSavedImage(serialNumber));
      }
    };

    window.addEventListener('soulspace-image-updated', handler);
    return () => window.removeEventListener('soulspace-image-updated', handler);
  }, [serialNumber]);

  const activeSrc = clientSrc || src;

  // Determine aspect ratio class based on orientation
  const getAspectClasses = () => {
    switch (orientation) {
      case 'portrait':
        return 'aspect-[3/4] sm:aspect-[4/5]';
      case 'square':
        return 'aspect-square';
      case 'wide':
        return 'aspect-[21/9] sm:aspect-[2.4/1]';
      case 'landscape':
      default:
        return 'aspect-[16/10] sm:aspect-[16/9]';
    }
  };

  const hasValidSrc = Boolean(
    activeSrc &&
      typeof activeSrc === 'string' &&
      activeSrc.trim().length > 0 &&
      !activeSrc.startsWith('/placeholder') &&
      activeSrc !== ''
  );

  return (
    <>
      <div
        className={`group relative w-full overflow-hidden rounded-xl border border-[#E5DFD4]/80 bg-[#181715] transition-all duration-500 hover:border-[#CBB8A0] hover:shadow-none ${getAspectClasses()} ${className}`}
      >
        {hasValidSrc ? (
          <>
            {activeSrc?.startsWith('data:') ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={activeSrc}
                alt={title || 'Soul Space architectural visual'}
                className="w-full h-full object-cover group-hover:scale-[1.02] transition-all duration-700 ease-out"
              />
            ) : (
              <Image
                src={activeSrc as string}
                alt={title || 'Soul Space architectural visual'}
                fill
                priority={priority}
                referrerPolicy="no-referrer"
                onLoad={() => setImgLoaded(true)}
                className={`transition-all duration-700 ease-out object-cover group-hover:scale-[1.02] ${
                  imgLoaded ? 'opacity-100' : 'opacity-0'
                }`}
              />
            )}
            <button
              type="button"
              onClick={() => setIsOpenModal(true)}
              className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/40 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:bg-black"
              aria-label="Inspect high resolution image"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </>
        ) : (
          /* Clean Architectural Placeholder - NO serial numbers or code tags */
          <div className="absolute inset-0 flex items-center justify-center p-6 text-center select-none bg-[#181715] transition-colors">
            {/* Subtle Architectural Grid Lines */}
            <div
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, #B8936D 1px, transparent 0)`,
                backgroundSize: '24px 24px',
              }}
            />

            {title && (
              <div className="relative z-10 px-4">
                <span className="font-serif text-sm sm:text-base text-[#D4B38C] font-normal tracking-wide">
                  {title}
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Lightbox / High Resolution Modal */}
      <AnimatePresence>
        {isOpenModal && hasValidSrc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpenModal(false)}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-6xl max-h-[90vh] w-full flex flex-col items-center"
            >
              <button
                type="button"
                onClick={() => setIsOpenModal(false)}
                className="absolute -top-12 right-0 p-2 text-white/80 hover:text-white rounded-full bg-black/40 hover:bg-black transition-colors cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="relative w-full h-[75vh]">
                {activeSrc?.startsWith('data:') ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={activeSrc}
                    alt={title || 'Soul Space architectural visual'}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <Image
                    src={activeSrc as string}
                    alt={title || 'Soul Space architectural visual'}
                    fill
                    className="object-contain"
                    referrerPolicy="no-referrer"
                  />
                )}
              </div>

              {title && (
                <div className="mt-3 text-center text-white/90">
                  <p className="font-serif text-lg text-[#EAE2D5]">{title}</p>
                  {caption && <p className="text-xs text-[#A89F91] font-light mt-1">{caption}</p>}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
