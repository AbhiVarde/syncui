const nextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "vercel.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/docs",
        destination: "/docs/installation",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
