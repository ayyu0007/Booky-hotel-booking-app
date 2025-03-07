import { url } from "inspector"
import type { Config } from "tailwindcss"
import { DEFAULT_CIPHERS } from "tls"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    fontFamily: {
      primary: 'var(--font-marcellus)',
      secondry: 'var(--font-urbanist)',
    },

    backgroundImage:{
      hero : 'url("/assets/hero/bg.jpg")',
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: '#292836',
          hover: '#3e3d4a',
        },
        secondary: '#6b6a71',
        accent: {
          DEFAULT: '#e85f4xc',
          hover: '#ea6f5e',
        },
        tertiary: {
          DEFAULT: '#faf5ef',
        },
        grey: {
          DEFAULT: '#a09faf',
        }
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config