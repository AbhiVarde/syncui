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
        source: "/",
        has: [
          {
            type: "host",
            value: "docs.syncui.design",
          },
        ],
        destination: "/docs",
      },
      {
        source: "/:path+",
        has: [
          {
            type: "host",
            value: "docs.syncui.design",
          },
        ],
        destination: "/docs/:path*",
      },
    ];
  },

  async redirects() {
    return [
      {
        source: "/docs",
        has: [
          {
            type: "host",
            value: "www.syncui.design",
          },
        ],
        destination: "https://docs.syncui.design/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/docs/:path+",
        has: [
          {
            type: "host",
            value: "www.syncui.design",
          },
        ],
        destination: "https://docs.syncui.design/:path*",
        permanent: true,
        statusCode: 301,
      },
      // Also handle syncui.design/docs (without www) - redirect to docs.syncui.design root
      {
        source: "/docs",
        has: [
          {
            type: "host",
            value: "syncui.design",
          },
        ],
        destination: "https://docs.syncui.design/",
        permanent: true,
        statusCode: 301,
      },

      {
        source: "/docs/:path+",
        has: [
          {
            type: "host",
            value: "syncui.design",
          },
        ],
        destination: "https://docs.syncui.design/:path*",
        permanent: true,
        statusCode: 301,
      },
    ];
  },
};

export default nextConfig;
