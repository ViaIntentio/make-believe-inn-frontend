import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import {resolve} from 'path';
import * as dotenv from 'dotenv';
//@ts-ignore
import packageJson from './package.json';

export default defineConfig(({ command, mode, ssrBuild }) => {
  const envFile = `./.env.${mode || 'development'}`;
  const ENV = dotenv.config({ path: resolve(__dirname, envFile) }).parsed;
  const viteEnv = {};
  Object.keys(ENV).forEach((key) => {
      if (key.startsWith('VITE_')) {
      viteEnv[`import.meta.env.${key}`] = JSON.stringify(ENV[key]);
      }
  });
  return {
    plugins: [
      vue(),
    ],
    base: './',
    server: {
      port: ENV.VITE_PORT,
      //host: '0.0.0.0', // Use if  need to expose
      strictPort: true,
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        ':': fileURLToPath(new URL('./src/modules/', import.meta.url))
      }
    },
    define: {
      'import.meta.env.MODE': JSON.stringify(mode),
      'import.meta.env.APP_VERSION': JSON.stringify(packageJson.version),
      ...viteEnv
    }
  }
});
