import type { Config } from 'tailwindcss';
import commonConfig from './src/tailwind-config';

const config: Pick<Config, 'content' | 'presets'> = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  presets: [commonConfig],
};

export default config;
