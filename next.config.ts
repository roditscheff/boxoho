import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  async redirects() {
    const anchors = [
      ["two-ways", "offers"],
      ["story", "story"],
      ["how-it-works", "offers"],
      ["postcard", "postcard"],
      ["map", "map"],
      ["register", "register"],
    ] as const;

    return anchors.flatMap(([from, hash]) => [
      {
        source: `/:locale(en|de)/${from}`,
        destination: `/:locale#${hash}`,
        permanent: false,
      },
    ]);
  },
};

export default nextConfig;
