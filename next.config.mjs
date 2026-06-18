const nextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx"],
  serverExternalPackages: ["mdx-bundler", "esbuild"],
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
