import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  // No external stock photography. Ready for official client assets.
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
  },
  devIndicators: false,
  transpilePackages: ['motion'],
  async redirects() {
    return [
      { source: '/mystic', destination: '/projects/mystic-villas', permanent: false },
      { source: '/mystic-villas', destination: '/projects/mystic-villas', permanent: false },
      { source: '/aurum', destination: '/projects/aurum-villas', permanent: false },
      { source: '/aurum-villas', destination: '/projects/aurum-villas', permanent: false },
      { source: '/abv-arbor', destination: '/projects/abv-arbor', permanent: false },
      { source: '/arbor', destination: '/projects/abv-arbor', permanent: false },
      { source: '/dotcom', destination: '/projects/dotcom-workspaces', permanent: false },
      { source: '/dotcom-workspaces', destination: '/projects/dotcom-workspaces', permanent: false },
      { source: '/uptown', destination: '/projects/uptown-residences', permanent: false },
      { source: '/uptown-residences', destination: '/projects/uptown-residences', permanent: false },
    ];
  },
  webpack: (config, {dev}) => {
    // HMR is disabled in AI Studio via DISABLE_HMR env var.
    // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
    if (dev && process.env.DISABLE_HMR === 'true') {
      config.watchOptions = {
        ignored: /.*/,
      };
    }
    return config;
  },
};

export default nextConfig;
