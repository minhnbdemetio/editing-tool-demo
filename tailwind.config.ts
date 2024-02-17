import type { Config } from 'tailwindcss';
import { nextui } from '@nextui-org/react';
import plugin from 'tailwindcss/plugin';

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
        border: '#82828226',
        'gray-100': 'rgba(37,40,47,0.15)',
        'green-500': 'rgb(34, 204, 136)',
      },
      borderWidth: {
        px: '1px',
      },
      textColor: {
        accent: 'rgb(34, 204, 136)',
        primaryGray: '#48505F',
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
        none: '0px',
        xs: '10px',
        sm: '11px',
        smm: '12px',
        smd: '13px',
        md: '14px',
        mmd: '15px',
        sml: '18px',
        lg: '20px',
      },
      fontFamily: {
        normal: 'Noto Sans HK',
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
      boxShadow: {
        thumb: '-2px 1px 6px 0px #00000040',
        switch: '0px 6px 8px 3px #0000001A inset',
        menu: '0px -2px 4px 0px #00286F0D',
        page: '0px 0px 12px 0px #00000026',
        header: '0px 2px 8px 0px #00286F0D',
      },
      screens: {
        mobile: '375px',
        desktop: '900px',
      },
      lineHeight: {
        normal: '125%',
        lg: '150%',
        xl: '200%',
        4.5: '18px',
      },
      spacing: {
        '1': '4px',
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '4.5': '18px',
        '5': '20px',
        '6': '24px',
        '7': '28px',
        '8': '32px',
        '9': '36px',
        '19': '76px',
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
      width: {
        '18': '72px',
      },
      height: {
        'fill-available': '-webkit-fill-available',
      },
      colors: {
        primary1: '#1A6DFF',
        'primary1-hover': '#337DFF',
        primary2: '#FFA726',
        'primary2-hover': '#FAB249',
        primary3: '#4CAF50',
        'primary3-hover': '#5CB760',
        error: '#D25128',
        success: '#4CAF50',
        warning: '#FFA726',
        'error-hover': '#DD613A',
        'success-hover': '#56BF5A',
        'warning-hover': '#FFB343',
        default1: '#ffffff',
        default2: '#F0F2F9',
        default3: '#E1E4EC',
        default4: '#C2C8D3',
        default5: '#9BA4B5',
        default6: '#6B7588',
        default7: '#2C3340',
        default8: '#2C3340',
        default9: '#5A6577',
        default10: '#E8EAEA',
        default11: '#200E32',
        default12: '#7B808E',
        default13: '#EBECF0',
        tertiary: '#A8C5FA',
        lime: {
          450: '#76EE59',
        },
      },
      dropShadow: {
        button: '0px 2px 20px rgba(0, 0, 0, 0.10)',
        menu: '0px -2px 4px 0px rgba(0, 40, 111, 0.05)',
      },
    },
  },

  darkMode: 'class',
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.hide-arrow-number-input': {
          '&::-webkit-outer-spin-button': {
            '-webkit-appearance': 'none',
            margin: '0',
          },
          '&::-webkit-inner-spin-button': {
            '-webkit-appearance': 'none',
            margin: '0',
          },

          /* Firefox */
          '&[type=number]': {
            '-moz-appearance': 'textfield',
          },
        },
      });
    }),
    nextui({
      themes: {
        light: {
          colors: {
            primary: {
              DEFAULT: '#1A6DFF',
            },
          },
        },
      },
    }),
  ],
};
export default config;
