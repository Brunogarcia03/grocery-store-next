/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["127.0.0.1", "localhost", process.env.NEXT_PUBLIC_BACKEND_URL],
  },
};

export default nextConfig;
