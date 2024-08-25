/** @type {import('next').NextConfig} */

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["strapi-grocery-store.onrender.com"],
    loader: "default",
  },
};

export default nextConfig;
