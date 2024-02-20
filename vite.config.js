import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Ultra-Gobi-Time-Reduction-Calculator/' // 为/仓库名/
})
