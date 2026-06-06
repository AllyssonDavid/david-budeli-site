/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/webp", "image/avif"],
  },
  experimental: {
    optimizeCss: true,
  },
};

module.exports = nextConfig;
