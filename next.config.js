/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  redirects: () => {
    return [
      {
        source: "/",
        destination: "/model/generate",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
