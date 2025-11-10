import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';
import flattenColorPalette from 'tailwindcss/lib/util/flattenColorPalette';

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme('colors'));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val]),
  );

  addBase({
    ':root': newVars,
  });
}

const config = {
  darkMode: ['class', 'class'],
  content: [
    './pages/**/*.{ts,tsx,md,mdx}',
    './components/**/*.{ts,tsx,md,mdx}',
    './app/**/*.{ts,tsx,md,mdx}',
    './src/**/*.{ts,tsx,md,mdx}',
    './posts/**/*.{ts,tsx,md,mdx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      // typography: (theme: any) => ({
      //   DEFAULT: {
      //     css: {
      //       pre: {
      //         backgroundColor: theme('colors.gray.100'),
      //         color: theme('colors.gray.900'),
      //         padding: theme('spacing.4'),
      //         borderRadius: theme('borderRadius.md'),
      //         fontSize: theme('fontSize.sm')[0],
      //         lineHeight: theme('lineHeight.snug'),
      //       },
      //       code: {
      //         color: theme('colors.indigo.600'),
      //         fontWeight: '600',
      //       },
      //       'code::before': {
      //         content: '""',
      //       },
      //       'code::after': {
      //         content: '""',
      //       },
      //     },
      //   },
      // }),
backgroundImage: {
  // Negro → Rojo (vertical, sutil)
  'letter-top': 'linear-gradient(360deg, #0A0A0A 0%, #991B1B 100%)',

  // Negro → Rojo (ligero diagonal, más vivo)
  'letter-middle': 'linear-gradient(2deg, #0B0B0B 2%, #B91C1C 98%)',

  // Fades laterales en negro (igual que tenías)
  'fade-left': 'linear-gradient(to right, #000000, transparent)',
  'fade-right': 'linear-gradient(to left, #000000, transparent)',
},

      boxShadow: {
        'alt-cta': 'inset 0px 0px 10px #FFFFFF',
        cta: 'inset 0px 0px 14px #000000',
        'letter-top': '0px 0px 20px #0F0C22',
      },
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
        handwriting: ['var(--font-handwriting)'],
        monalisa: ['var(--font-monalisa)'],
      },
      colors: {
        'letter-bottom': '#68147D',
        'bg-default': '#0c0707ff',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'marquee-scroll': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        marquee2: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'marquee-scroll': 'marquee-scroll 40s linear infinite',
        marquee: 'marquee 25s linear infinite',
        marquee2: 'marquee2 25s linear infinite',
        'marquee-infinite': 'marquee 25s linear infinite',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    addVariablesForColors,
    require('@tailwindcss/typography'),
  ],
  variants: {
    extend: {
      animation: ['hover', 'group-hover'],
    },
  },
} satisfies Config;

export default config;
