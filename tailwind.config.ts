import type { Config } from 'tailwindcss';
import { nextui } from '@nextui-org/react';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      borderColor: {
        main: 'rgba(37,40,47,0.1)',
      },
      textColor: {
        primary: 'rgb(34, 204, 136)',
        'black-500': 'rgba(37,40,47,1)',
        'gray-500': 'rgba(157,158,163,1)',
        'icon-gray': '#7a7b80',
        'icon-light-gray': '#c4c5c6',
      },
      fontSize: {
        sm: '11px',
        md: '14px',
        lg: '20px',
      },
      fontFamily: {
        normal: 'Figtree',
      },
      backgroundColor: {
        main: '#fff',
      },

      screens: {
        desktop: '900px',
      },
    },
  },
  darkMode: 'class',
  plugins: [nextui()],
};
export default config;
