import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#000000',
        'secondary': '#5e5e5d',
        'tertiary': '#000000',
        'background': '#fdf8f8',
        'surface': '#fdf8f8',
        'on-surface': '#1c1b1b',
        'on-surface-variant': '#444748',
        'outline': '#747878',
        'gold-accent': '#C5A059',
        'primary-container': '#1c1b1b',
        'secondary-container': '#e0dfde',
        'surface-container': '#f1edec',
        'surface-container-low': '#f7f3f2',
        'surface-container-high': '#ebe7e6',
        'surface-container-lowest': '#ffffff',
        'surface-container-highest': '#e5e2e1',
        // add any extra colors from the design as needed
      },
      borderRadius: {
        DEFAULT: '0.125rem',
        lg: '0.25rem',
        xl: '0.5rem',
        full: '0.75rem',
      },
      spacing: {
        'margin-desktop': '64px',
        'margin-mobile': '20px',
        'gutter': '24px',
        'unit': '4px',
        'container-max': '1440px',
      },
      fontFamily: {
        'label-caps': ['DM Sans'],
        'data-tabular': ['JetBrains Mono'],
        'headline-sm': ['Playfair Display'],
        'headline-md': ['Playfair Display'],
        'display-lg': ['Playfair Display'],
        'body-md': ['DM Sans'],
        'body-lg': ['DM Sans'],
      },
      fontSize: {
        'label-caps': ['12px', { lineHeight: '1', letterSpacing: '0.1em', fontWeight: '700' }],
        'data-tabular': ['14px', { lineHeight: '1.4', letterSpacing: '-0.01em', fontWeight: '500' }],
        'headline-sm': ['24px', { lineHeight: '1.3', fontWeight: '600' }],
        'headline-md': ['32px', { lineHeight: '1.2', fontWeight: '600' }],
        'display-lg': ['48px', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'body-md': ['15px', { lineHeight: '1.5', fontWeight: '400' }],
        'body-lg': ['18px', { lineHeight: '1.6', fontWeight: '400' }],
      },
    },
  },
  plugins: [],
};

export default config;
