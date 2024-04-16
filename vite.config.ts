import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite';
import {AntDesignVueResolver, ElementPlusResolver} from 'unplugin-vue-components/resolvers';
import prismjsPlugin from "vite-plugin-prismjs";

// https://vitejs.dev/config/
export default defineConfig({
      plugins: [
            vue(),
            AutoImport({
                  resolvers: [ElementPlusResolver()],
            }),
            Components({
                  resolvers: [
                        AntDesignVueResolver({
                              importStyle: false,
                        }),
                        ElementPlusResolver()
                  ]
            }),
            prismjsPlugin({
                  languages: [
                        'json', 'java', 'go', 'python', 'php', 'bash',
                        'c', 'c#', 'cpp', 'yaml', 'kotlin', 'sql', 'javascript',
                        'typescript'
                  ],
            })
      ],
      server: {
            port: 3000,
            open: true,
            proxy: {
                  '/api': {
                        target: 'http://47.120.46.29:8080/api',
                        // target: 'http://localhost:8080/api',
                        changeOrigin: true,
                        rewrite: (path) => path.replace(/^\/api/, "")
                  }
            }
      }
})
