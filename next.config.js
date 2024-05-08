/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (webpackConfig, { webpack }) => {
    webpackConfig.resolve.fallback = { fs: false, net: false, tls: false };
    webpackConfig.plugins.push(
      // Remove node: from import specifiers, because Next.js does not yet support node: scheme
      // https://github.com/vercel/next.js/issues/28774
      new webpack.NormalModuleReplacementPlugin(
        /^node:/,
        (resource) => {
          resource.request = resource.request.replace(/^node:/, '');
        },
      ),
    );
    return webpackConfig;
  },
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
        hostname: "alpha.7007.studio",
      },
    ],
  },
};

module.exports = nextConfig;
