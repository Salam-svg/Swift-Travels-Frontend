import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    ["react-refresh/babel", { "skipEnvCheck": true }]
  ],
  theme: {
    extend: {
      animation: {
        'border-flow': 'border-flow 3s ease infinite',
      },
      keyframes: {
        'border-flow': {
          '0%, 100%': { 
            backgroundPosition: '0% 50%' 
          },
          '50%': { 
            backgroundPosition: '100% 50%' 
          }
        }
      }
    },
  },
  variants: {
    extend: {
      backgroundPosition: ['group-hover']
    }
  },

})
