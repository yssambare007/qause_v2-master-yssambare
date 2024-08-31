// @ts-check
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import("./src/env/server.mjs"));

/** @type {import("next").NextConfig} */
const config = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  reactStrictMode: false,
  swcMinify: true,
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  images: {
    domains: [
      "flagcdn.com",
      "upload.wikimedia.org",
      "s3.ap-south-1.amazonaws.com",
      "www.qause.com",
      "qauseuat.s3.ap-south-1.amazonaws.com",
      "media.istockphoto.com",
      "wowslider.com",
      "qause.cc",
      "img.icons8.com",
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};
export default config;
