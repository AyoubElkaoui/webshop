// astro.config.mjs
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
    integrations: [
        react(),
        tailwind()
    ],
    server: {
        port: 4321
    },
    // Voor API calls naar Payload CMS
    vite: {
        define: {
            'process.env.PAYLOAD_API_URL': JSON.stringify(process.env.PAYLOAD_API_URL || 'http://localhost:3000')
        }
    }
});