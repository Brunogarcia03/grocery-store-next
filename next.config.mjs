/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [NEXT_PUBLIC_BASE_BACKEND_URL],
  },
};

export default nextConfig;
