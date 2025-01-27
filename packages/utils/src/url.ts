import { __SERVER__ } from './helpers';

export const getBaseUrl = () => {
  if (!__SERVER__) return window.location.origin;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:${process.env.PORT ?? 3000}`;
};
