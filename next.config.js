
const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  i18n: {
    locales: ['en', 'vi'],
    defaultLocale: 'en',
  },
  sassOptions: {
    includePaths: [path.join(__dirname, '/**/**/*.scss')],
  },
}

module.exports = nextConfig