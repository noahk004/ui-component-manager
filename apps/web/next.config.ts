import type { NextConfig } from "next";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

const nextConfig: NextConfig = {
    webpack: (config) => {
        config.plugins.push(new MiniCssExtractPlugin());
        return config;
    },
    images: {
        domains: ["placehold.co"],
    },
};

export default nextConfig;
