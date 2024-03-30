import type { Config } from 'tailwindcss';
import commonConfig from '@{workspace}/ui/tailwind-config.ts';

const config: Pick<Config, 'content' | 'presets'> = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  presets: [commonConfig],
};

export default config;
