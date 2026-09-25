import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  serverExternalPackages:["typeorm", "better-sqlite3", "pg"],
  outputFileTracingIncludes: {
    '/*': ['node_modules/pg/**/*'],
  },
};

export default nextConfig;
