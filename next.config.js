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
};

module.exports = nextConfig;
