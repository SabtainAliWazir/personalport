import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ isPreview }) => ({
  plugins: [react()],
  appType: isPreview ? 'mpa' : 'spa',
}))
