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
        'gray-100': 'rgba(37,40,47,0.15)',
        'green-500': 'rgb(34, 204, 136)',
      },
      textColor: {
        primary: 'rgb(34, 204, 136)',
        primaryContrast: '#fff',
        'black-500': 'rgba(37,40,47,1)',
        'gray-500': 'rgba(157,158,163,1)',
        'gray-400': 'rgba(37,40,47,0.65)',
        'gray-200': 'rgba(37,40,47,0.3)',

        'icon-gray': '#7a7b80',
        'icon-light-gray': '#c4c5c6',
        'icon-bold': '#25282f',
      },
      fontSize: {
        xs: '10px',
        sm: '11px',
        md: '14px',
        lg: '20px',
      },
      fontFamily: {
        normal: 'Figtree',
      },
      backgroundColor: {
        main: '#fff',
        border: 'rgba(37,40,47,0.1)',
        'green-500': 'rgb(34, 204, 136)',
        'green-200': 'rgba(34, 204, 136, 0.15)',
      },

      backgroundImage: {
        gradientBtnRight: 'linear-gradient(125deg, #00CCBB 3%, #4285f4 97%)',
        gradientBtnLeft:
          'linear-gradient(109deg, #82E673 2%, rgb(34, 204, 136) 48%, #00CCBB 98%) ',
      },

      screens: {
        mobile: '375px',
        desktop: '900px',
      },
      lineHeight: {
        normal: '125%',
        lg: '150%',
        xl: '200%',
      },
      spacing: {
        '1': '4px',
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '5': '20px',
        '6': '24px',
        '7': '28px',
        '8': '32px',
        '9': '36px',
      },
      animation: {
        fade: 'fadeIn .5s ease-in-out',
      },

      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
    },
  },
  darkMode: 'class',
  plugins: [nextui()],
};
export default config;
