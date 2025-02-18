import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  metadata: {
    title: "Meals Recipe App",
    description: "Created for test assessment app",
  },
  images: {
    domains: ["www.themealdb.com"],
  },

};

export default nextConfig;
