import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
	base: '/lHood/',
	server: {
		proxy: {
			'/lHood/api': {
				//target: 'http://localhost:3001',
				target: 'https://lhood.onrender.com',
				changeOrigin: true,
				rewrite: path => {
					console.log(path)
					return path.replace(/^\^\/lHood\/api/, '')
				},
			},
		},
	},
  plugins: [svgr() ,react()],
})
