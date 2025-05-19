/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Accept any hostname
      },
      {
        protocol: 'http',
        hostname: '**', // Also accept any HTTP images (optional)
      },
    ],
  },
};

export default nextConfig;
