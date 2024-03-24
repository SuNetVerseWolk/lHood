import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
	//base: '/lHood/',
	server: {
		proxy: {
			'/api': {
				target: 'http://localhost:3001',
				changeOrigin: true,
				rewrite: path => path.replace(/^\/api/, '')
			},
		},
	},
  plugins: [svgr() ,react()],
})
