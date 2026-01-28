import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import pkg from './package.json'


// https://vitejs.dev/config/
export default defineConfig({
    define: {
        __REQUIRED_SERVER_VERSION__: JSON.stringify( pkg.engines.webserver )
    },
    plugins: [
        vue()
    ],
})
