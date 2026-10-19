import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({base:process.env.THEME_BASE_PATH||'/',plugins:[react()],build:{target:'es2022',manifest:true},server:{host:'127.0.0.1',port:5185,strictPort:true}});
