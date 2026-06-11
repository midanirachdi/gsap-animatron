import react from '@vitejs/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
    plugins: [
        react(),
        ...(mode === 'analyze'
            ? [
                  visualizer({
                      brotliSize: true,
                      filename: 'dist/stats.html',
                      gzipSize: true,
                      open: true,
                  }),
              ]
            : []),
    ],
    build: {
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (
                        id.includes('node_modules/gsap/ScrollTrigger') ||
                        id.includes('node_modules/gsap/DrawSVGPlugin') ||
                        id.includes('node_modules/gsap/SplitText') ||
                        id.includes('node_modules/gsap/Observer')
                    ) {
                        return 'gsap-plugins';
                    }

                    if (id.includes('node_modules/gsap')) {
                        return 'gsap';
                    }
                },
            },
        },
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
}));
