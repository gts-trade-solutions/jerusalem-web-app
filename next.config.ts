import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Pin the workspace root so sibling lockfiles elsewhere on disk aren't
  // mistaken for the project root by Turbopack.
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
