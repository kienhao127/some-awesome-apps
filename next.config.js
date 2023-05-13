
const path = require('path');
const { i18n } = require("./next-i18next.config");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  i18n,
  sassOptions: {
    includePaths: [path.join(__dirname, '/**/**/*.scss')],
  },
}

module.exports = nextConfig