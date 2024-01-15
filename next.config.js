/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  redirects: () => {
    return [
      {
        source: "/",
        destination: "/marketplace",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cloudflare-ipfs.com",
        port: "",
        pathname: "/ipfs/**",
      },
    ],
  },
};

module.exports = nextConfig;
