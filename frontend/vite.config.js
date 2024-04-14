import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import jsconfigPaths from 'vite-jsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [svgr(), react(), jsconfigPaths()],
	base: '/lHood/',
	server: {
		host: true,
		proxy: {
			'/api': {
				//target: 'http://localhost:3001',
				target: 'https://lhood.onrender.com',
				changeOrigin: true,
				rewrite: path => path.replace(/^\/api/, ''),
			},
		},
	},
})
