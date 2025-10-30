import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
	output: 'export',
  reactStrictMode: true,
  webpack: (config) => { // webpack cache hibauzenet (keves memoria vagy tul nagy cache fajlok miatt)
    config.cache = false; 
    return config;
  }
};


export default nextConfig;
