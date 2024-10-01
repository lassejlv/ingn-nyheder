/** @type {import('next').NextConfig} */
const nextConfig = {
   output: 'standalone',
   images: {
      remotePatterns: [
         {
            hostname: 'assets.ctfassets.net',
         },
      ],
   },
};

export default nextConfig;
