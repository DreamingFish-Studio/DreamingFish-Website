/** @type {import('next').NextConfig} */
const basePath = process.env.PAGES_BASE_PATH ?? "";

const nextConfig = {
  output: process.env.GITHUB_PAGES === "true" ? "export" : undefined,
  basePath,
  assetPrefix: basePath || undefined,
  images: {
    unoptimized: process.env.GITHUB_PAGES === "true"
  }
};

export default nextConfig;
