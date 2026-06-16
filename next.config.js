/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Static export to /out, deployed on Netlify. Redirects live in public/_redirects.
  output: 'export',
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
