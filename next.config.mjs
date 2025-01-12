/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.animeonix.win",
        pathname: "/static/**",
      },
    ],
  },
};

export default nextConfig;
