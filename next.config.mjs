/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'i.etsystatic.com' },
      { protocol: 'https', hostname: 'www.dancingbeedesigns.com' }
    ]
  }
};
export default nextConfig;
