/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cloudflare-ipfs.com",
        port: "",
        pathname: "/ipfs/**",
      },
      {
        protocol: "https",
        hostname: "7007.studio",
      },
    ],
  },
};

module.exports = nextConfig;
