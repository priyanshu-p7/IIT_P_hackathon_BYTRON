import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/IIT_P_hackathon_BYTRON/',
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
