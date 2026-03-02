import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
        // 允许访问父目录的文件
        fs: {
          allow: ['..']
        }
      },
      // 开发环境启用 publicDir，构建时禁用（GitHub Actions 会单独处理）
      publicDir: mode === 'development' ? 'public' : false,
      // 构建输出到 dist 目录
      build: {
        outDir: 'dist',
        emptyOutDir: true,
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
