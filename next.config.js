/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["pbeluxmzaotchltahukj.supabase.co"], // Add your Supabase URL domain here
  },
};

module.exports = nextConfig;
