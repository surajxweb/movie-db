/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['m.media-amazon.com', 'image.tmdb.org'], // Combine domains into a single array
  },
};

module.exports = nextConfig;
