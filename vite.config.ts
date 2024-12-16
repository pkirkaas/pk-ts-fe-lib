import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
import sass from 'sass';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({
    jsxImportSource: "@emotion/react",
    babel: {
      plugins: ["@emotion/babel-plugin"],
    },
  },
    // Didn't need the below yet, but just in case...
    /*{
    jsxRuntime: 'classic',
    include: /\.(css|js|jsx|ts|tsx)$/,
} */)],
  build: {
    mode:"development",
    minify:false,
    outDir: 'build',
    sourcemap: true,
  },
  define: {
    global: {},
  }
})
