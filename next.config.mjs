/** @type {import('next').NextConfig} */
// next.config.mjs
const nextConfig = {
    async rewrites() {
      return [
        {
          source: '/api/coingecko/:path*',
          destination: 'https://api.coingecko.com/api/:path*', // Proxy to CoinGecko
        },
      ];
    },
  };
  
  export default nextConfig;
