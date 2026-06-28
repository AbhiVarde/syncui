const nextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx"],
  serverExternalPackages: ["mdx-bundler", "esbuild"],
  transpilePackages: ["geist"],
  async redirects() {
    return [
      {
        source: "/docs",
        destination: "/docs/installation",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/r/:path*",
        headers: [{ key: "Access-Control-Allow-Origin", value: "*" }],
      },
    ];
  },
};

export default nextConfig;
