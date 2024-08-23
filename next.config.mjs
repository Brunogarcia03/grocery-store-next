/** @type {import('next').NextConfig} */

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "strapi-grocery-store.onrender.com",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
