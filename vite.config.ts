import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(
    // Didn't need the below yet, but just in case...
    /*{
    jsxRuntime: 'classic',
    include: /\.(css|js|jsx|ts|tsx)$/,
} */)],
  build: {
    outDir: 'build',
    sourcemap: true,
  }
})
