import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig } from 'vite';
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@schemas': path.resolve(__dirname, './src/schemas'),
            '@components': path.resolve(__dirname, './src/components')
        }
    },
    optimizeDeps: {
        esbuildOptions: {
            target: 'es2022',
        }
    }
});
