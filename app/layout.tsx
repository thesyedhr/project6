import type { Metadata } from 'next';
import { Cormorant_Garamond, Plus_Jakarta_Sans } from 'next/font/google';
import { SmoothScroll } from '@/components/SmoothScroll';
import { PageLoader } from '@/components/PageLoader';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'SOUL SPACE INFRASTRUCTURE — Premium Residential & Commercial Developments',
  description: 'Exclusive luxury residences, landmark commercial workspaces, and community developments by Soul Space Infrastructure across Coimbatore.',
  openGraph: {
    title: 'SOUL SPACE INFRASTRUCTURE — Premium Residential & Commercial Developments',
    description: 'Exclusive luxury residences, landmark commercial workspaces, and community developments by Soul Space Infrastructure across Coimbatore.',
    type: 'website',
    siteName: 'SOUL SPACE INFRASTRUCTURE',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SOUL SPACE INFRASTRUCTURE — Premium Residential & Commercial Developments',
    description: 'Exclusive luxury residences, landmark commercial workspaces, and community developments by Soul Space Infrastructure across Coimbatore.',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HomeAndConstructionBusiness',
  name: 'SOUL SPACE INFRASTRUCTURE',
  description: 'Civil construction, premium villas, luxury apartments, and commercial IT developments in Coimbatore.',
  foundingDate: '2016',
  areaServed: ['Coimbatore', 'Tamil Nadu', 'India'],
  address: {
    '@type': 'PostalAddress',
    streetAddress: '5/2A, Hindusthan Avenue, Nava India Road, Sowripalayam Post',
    addressLocality: 'Coimbatore',
    addressRegion: 'Tamil Nadu',
    postalCode: '641028',
    addressCountry: 'IN',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jakarta.variable} scroll-smooth`}>
      <head>
        <link rel="preload" href="/brand/logo-mark.png" as="image" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){if(typeof window==='undefined')return;var orig=JSON.stringify;JSON.stringify=function(val,replacer,space){var seen=new WeakSet();var safeReplacer=function(key,v){if(typeof v==='object'&&v!==null){if(typeof Element!=='undefined'&&v instanceof Element){return'<'+(v.tagName?v.tagName.toLowerCase():'element')+'>';}if(seen.has(v)){return'[Circular]';}seen.add(v);}if(typeof replacer==='function'){return replacer.call(this,key,v);}return v;};try{return orig(val,safeReplacer,space);}catch(e){try{return orig(val,null,space);}catch(err){return'{}';}}};})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased bg-[#F7F5F0] text-[#1D1B18] selection:bg-[#B8936D] selection:text-white min-h-screen" suppressHydrationWarning>
        <PageLoader />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}

