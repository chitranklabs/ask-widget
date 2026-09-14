import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    react(),
    dts({
      tsconfigPath: './tsconfig.app.json',
      include: ['src'],
      insertTypesEntry: true,
    }),
  ],
  build: {
    target: 'esnext',
    lib: {
      entry: resolve(import.meta.dirname, 'src/index.lib.ts'),
      name: 'AskWidget',
      fileName: format => `ask-widget.${format}.js`,
      formats: ['es', 'cjs', 'umd'],
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime', 'react/jsx-dev-runtime'],
      output: {
        preserveModules: false,
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime',
          'react/jsx-dev-runtime': 'jsxDevRuntime',
        },
        assetFileNames: 'style.css',
      },
    },
    sourcemap: true,
    minify: true, // Powered by Oxc in Vite 8
    cssMinify: 'lightningcss',
    cssCodeSplit: false,
  },
  resolve: {
    alias: {
      '@': resolve(import.meta.dirname, './src'),
    },
  },
});
