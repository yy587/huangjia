const isGitHubPages = process.env.GITHUB_PAGES === "true";
const basePath = isGitHubPages ? "/huangjia" : "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: isGitHubPages ? "export" : undefined,
  basePath,
  assetPrefix: basePath,
  trailingSlash: isGitHubPages,
  images: {
    unoptimized: true
  }
};

export default nextConfig;
