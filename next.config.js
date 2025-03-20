/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost', 'vercel.app'],
    unoptimized: true
  },
  typescript: {
    // Ignorar errores de TS durante la construcción para producción
    ignoreBuildErrors: true,
  },
  eslint: {
    // Ignorar errores de ESLint durante la construcción para producción
    ignoreDuringBuilds: true,
  }
}

module.exports = nextConfig
