import remarkGfm from "remark-gfm";

const nextConfig = {
  webpack: async (config, options) => {
    config.module.rules.push({
      test: /\.mdx?$/,
      use: [
        options.defaultLoaders.babel,
        {
          loader: "@mdx-js/loader",
          options: {
            remarkPlugins: [remarkGfm],
          },
        },
      ],
    });

    return config;
  },
  pageExtensions: ["js", "jsx", "md", "mdx"],

  async rewrites() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "docs.syncui.design" }],
        destination: "/docs/:path*",
      },
    ];
  },
};

export default nextConfig;
