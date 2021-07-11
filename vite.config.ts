// import eslintPlugin from 'vite-plugin-eslint'
import { defineConfig } from 'vite'

import reactRefresh from '@vitejs/plugin-react-refresh'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    reactRefresh(),
    // eslintPlugin({ cache: false, throwOnWarning: false })
  ],
})
