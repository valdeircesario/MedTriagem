import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['jwt-decode'], // Inclui jwt-decode para evitar problemas de importação
    exclude: ['lucide-react'], // Mantém a exclusão de lucide-react
  },
});