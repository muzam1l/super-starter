/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import('./src/env.js');

/** @type {import("next").NextConfig} */
const config = {
  transpilePackages: [
    '@{workspace}/ui',
    '@{workspace}/config',
    '@{workspace}/auth',
    '@{workspace}/utils',
    '@{workspace}/api',
  ],
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default config;
