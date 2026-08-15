import withBundleAnalyzer from "@next/bundle-analyzer";

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx"],
  serverExternalPackages: ["mdx-bundler", "esbuild"],
  transpilePackages: ["geist"],
  experimental: {
    optimizePackageImports: [
      "@mui/material",
      "@hugeicons/react",
      "react-icons",
      "motion",
    ],
    optimizeCss: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
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
  async headers() {
    return [
      {
        source: "/r/:path*",
        headers: [{ key: "Access-Control-Allow-Origin", value: "*" }],
      },
    ];
  },
};

export default bundleAnalyzer(nextConfig);
