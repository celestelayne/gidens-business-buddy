/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    // Add environment variables here
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "**",
      },
			{
        protocol: "https",
        hostname: 'img.clerk.com',
        port: "",
        pathname: "**",
      },
			{
        protocol: "https",
        hostname: "replicate.delivery",
        port: "",
        pathname: "**",
      },
			{
        protocol: "https",
        hostname: "a16z.com",
        port: "",
        pathname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
