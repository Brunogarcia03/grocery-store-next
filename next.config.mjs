/** @type {import('next').NextConfig} */

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["strapi-grocery-store.onrender.com"], // Coloca directamente el dominio aquí como una cadena
  },
};

export default nextConfig;
