import { defineConfig } from 'vite'

export default defineConfig({
    build: {
        rollupOptions: {
          external: [
            'release-train.png',
            'slidev-version.png'
          ],
        },
    }
})