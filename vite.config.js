import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        xoamu: resolve(__dirname, 'xoamu.html'),
        skill_ai_agent: resolve(__dirname, 'skill_ai_agent.html'),
        card: resolve(__dirname, 'card.html')
      }
    }
  }
})
