import { defineConfig } from 'vite'
import path from 'path';

//Plugins for react and pages
import react from '@vitejs/plugin-react'
import Pages from 'vite-plugin-pages'

//Plugins for polyfills and tsconfig paths
import tsconfigPaths from 'vite-tsconfig-paths';
import eslint from 'vite-plugin-eslint';
import { nodePolyfills } from 'vite-plugin-node-polyfills'

export default defineConfig({
  resolve: {
    alias: {
      '~/': path.resolve(__dirname, './src/*'),
    }
  },
  plugins: [
    react({
      include: "**/*.tsx"
    }),
    Pages({ dirs: 'src/pages' }),
    eslint(),
    tsconfigPaths(),
    nodePolyfills(),
  ],
});
