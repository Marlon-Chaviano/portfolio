import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  images: {
    // Book covers come from Open Library when a book only has an ISBN.
    remotePatterns: [{ protocol: "https", hostname: "covers.openlibrary.org", pathname: "/b/**" }],
  },
  experimental: {
    // The root layout lives under [lang], so unmatched URLs need their own 404.
    globalNotFound: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default createMDX({})(nextConfig);
