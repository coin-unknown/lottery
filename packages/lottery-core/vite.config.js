import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [dts()],
  build: {
    lib: {
      entry: 'src/index.ts', // Основной вход
      name: 'index',
      fileName: '[name]',
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      input: {
        index: 'src/index.ts', // Основной входной файл
        node: 'src/node.ts', // Второй входной файл
      },
      external: ['@ton/core', '@ton/ton', '@ton/crypto'],
      output: {
        sourcemap: true,
        globals: {
          '@ton/core': 'TonCore',
          '@ton/ton': 'TonTon',
          '@ton/crypto': 'TonCrypto',
        },
      },
    },
  },
});
