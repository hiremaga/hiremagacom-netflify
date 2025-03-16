/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Make sure the _redirects file is copied to the output directory
  // This is needed for Netlify redirects to work
  async rewrites() {
    return [];
  }
}

module.exports = nextConfig