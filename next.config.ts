import type { NextConfig } from "next";
import { assertProductionEnv } from "./lib/env";

try {
  assertProductionEnv();
} catch (err) {
  // Fail the production build loudly; rethrow so next build exits non-zero
  console.error(err instanceof Error ? err.message : err);
  throw err;
}

const nextConfig: NextConfig = {};

export default nextConfig;
