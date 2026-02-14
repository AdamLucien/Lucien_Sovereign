import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        en: resolve(__dirname, 'en/index.html'),
        en_systemic: resolve(__dirname, 'en/capabilities/systemic-reconstruction/index.html'),
        en_causal: resolve(__dirname, 'en/capabilities/causal-ai-backbone/index.html'),
        en_entropy: resolve(__dirname, 'en/capabilities/entropy-elimination/index.html'),
        en_sovereign: resolve(__dirname, 'en/capabilities/sovereign-frameworks/index.html'),
        cs: resolve(__dirname, 'cs/index.html'),
        cs_systemic: resolve(__dirname, 'cs/capabilities/systemic-reconstruction/index.html'),
        cs_causal: resolve(__dirname, 'cs/capabilities/causal-ai-backbone/index.html'),
        cs_entropy: resolve(__dirname, 'cs/capabilities/entropy-elimination/index.html'),
        cs_sovereign: resolve(__dirname, 'cs/capabilities/sovereign-frameworks/index.html'),
        de: resolve(__dirname, 'de/index.html'),
        de_systemic: resolve(__dirname, 'de/capabilities/systemic-reconstruction/index.html'),
        de_causal: resolve(__dirname, 'de/capabilities/causal-ai-backbone/index.html'),
        de_entropy: resolve(__dirname, 'de/capabilities/entropy-elimination/index.html'),
        de_sovereign: resolve(__dirname, 'de/capabilities/sovereign-frameworks/index.html'),
        uk: resolve(__dirname, 'uk/index.html'),
        uk_systemic: resolve(__dirname, 'uk/capabilities/systemic-reconstruction/index.html'),
        uk_causal: resolve(__dirname, 'uk/capabilities/causal-ai-backbone/index.html'),
        uk_entropy: resolve(__dirname, 'uk/capabilities/entropy-elimination/index.html'),
        uk_sovereign: resolve(__dirname, 'uk/capabilities/sovereign-frameworks/index.html'),
        zh: resolve(__dirname, 'zh/index.html'),
        zh_systemic: resolve(__dirname, 'zh/capabilities/systemic-reconstruction/index.html'),
        zh_causal: resolve(__dirname, 'zh/capabilities/causal-ai-backbone/index.html'),
        zh_entropy: resolve(__dirname, 'zh/capabilities/entropy-elimination/index.html'),
        zh_sovereign: resolve(__dirname, 'zh/capabilities/sovereign-frameworks/index.html'),
      },
    },
  },
})
