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
        port: "",
        pathname: "/**",
      },
      // Agrega más patrones si es necesario
    ],
  },
};

export default nextConfig;
