import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import tailwindcss from "tailwindcss";
import commonjs from 'vite-plugin-commonjs'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

export default defineConfig({
  plugins: [nodePolyfills(), commonjs(), react()],
  css: {
   modules: {
    localsConvention: "camelCaseOnly",
   },
   postcss: {
    plugins: [tailwindcss()],
   },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@components': resolve(__dirname, './src/components'),
      '@utils': resolve(__dirname, './src/utils'),
    }
  },
  define: {
    'process.env': {},
  },
  build: {
    outDir: 'build',
    emptyOutDir: true,
    lib: {
      entry: resolve(__dirname, 'src/main.tsx'),
      name: 'SDKWidget',
      fileName: 'sdk-widget',
      formats: ['iife', 'es', 'cjs'],
    },
    rollupOptions: {
      output: {
        extend: true,
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        },
        assetFileNames: (assetInfo: any) => {
          if (assetInfo.name === 'style.css') {
            return 'sdk-widget.css';
          }
          return assetInfo.name;
        },
      }
    },
    cssCodeSplit: false
  }
}) 