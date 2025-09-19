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
      // Handle docs.syncui.design root - serve docs index page
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
      // Handle docs.syncui.design subpaths - serve docs pages
      {
        source: "/:path*",
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
        source: "/docs/:path*",
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
      // Redirect syncui.design/docs to docs.syncui.design
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
      // Redirect syncui.design/docs/* to docs.syncui.design/*
      {
        source: "/docs/:path*",
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
