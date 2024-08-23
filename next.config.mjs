/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [new URL(process.env.NEXT_PUBLIC_BASE_BACKEND_URL).hostname],
  },
};

export default nextConfig;
