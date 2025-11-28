import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	// output: 'export',
  reactStrictMode: true,
  webpack: (config) => { 
    config.cache = false; 
    return config;
  }
};

export default nextConfig;
