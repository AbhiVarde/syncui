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
      // Handle other docs paths (not root)
      {
        source: "/:path+", // :path+ requires at least one segment
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
      // Redirect docs.syncui.design/ (root) to main site docs
      {
        source: "/",
        has: [
          {
            type: "host",
            value: "docs.syncui.design",
          },
        ],
        destination: "https://syncui.design/docs",
        permanent: true,
        statusCode: 301,
      },
      // Redirect www.syncui.design/docs to docs.syncui.design
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
      // Redirect www.syncui.design/docs/* to docs.syncui.design/*
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
      // Same for syncui.design (without www)
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
