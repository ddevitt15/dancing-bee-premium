import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        cream: '#fbf5ea',
        ivory: '#fffaf2',
        honey: '#c98f2c',
        honeyDark: '#936420',
        ink: '#1e1a16',
        taupe: '#9f8e7b',
        linen: '#ede0cf',
        blush: '#f2d2cf'
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        soft: '0 24px 70px rgba(43, 31, 18, 0.12)',
        glow: '0 24px 90px rgba(201, 143, 44, 0.28)'
      },
      backgroundImage: {
        'honey-radial': 'radial-gradient(circle at 18% 20%, rgba(201,143,44,.26), transparent 28%), radial-gradient(circle at 80% 10%, rgba(242,210,207,.38), transparent 22%), linear-gradient(135deg, #fffaf2 0%, #fbf5ea 48%, #eadac4 100%)'
      }
    }
  },
  plugins: []
};
export default config;
