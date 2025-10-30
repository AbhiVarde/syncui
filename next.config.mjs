import remarkGfm from "remark-gfm";

const nextConfig = {
  turbopack: {
    rules: {
      "*.mdx": {
        loaders: ["@mdx-js/loader"],
        as: "*.js",
      },
    },
  },

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
};

export default nextConfig;
