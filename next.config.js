const withPlugins = require('next-compose-plugins');
const withImages = require("next-images");
//const withBundleAnalyzer = require('@next/bundle-analyzer')({
//  enabled: process.env.ANALYZE === 'true'
//})
const nextConfig = {
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    domains: [
      "https://s3.ap-south-1.amazonaws.com",
      "localhost:3000",
      "https://studyinfocentre.com/",
      "studyinfocentre.com",
    ],
  },
};
module.exports = withPlugins([[withImages({
  webpack5: false,
  webpack(config, options) {
    return config;
  },
  mode: "production"
})],[{generateBuildId: async () => {
  // You can, for example, get the latest git commit hash here
  return 'Q3n8dbnPzLvwHs3YUa71v'
}}]],nextConfig,);
