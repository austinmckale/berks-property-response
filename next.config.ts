import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/emergency",
        destination: "/emergency-sewer-backup-berks-county-pa",
        permanent: true,
      },
      {
        source: "/after-leak",
        destination: "/water-damage-repair-after-leak-berks-county-pa",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
