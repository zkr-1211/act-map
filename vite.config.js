import { defineConfig } from 'vite'
import { resolve } from 'path'
import viteImagemin from 'vite-plugin-imagemin'

export default defineConfig({
  // base: './',
  resolve: {
    alias: {
      '@': `${resolve(__dirname, 'src')}`
    }
  },
  build: {
    target: 'modules', // 指定es版本,浏览器的兼容性
    outDir: 'dist', // 指定打包输出路径
    assetsDir: 'assets', // 指定静态资源存放路径
    cssCodeSplit: true, // css代码拆分,禁用则所有样式保存在一个css里面
    assetsInlineLimit: 4096, // 小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求。设置为 0 可以完全禁用此项
    sourcemap: false, // 是否构建source map 文件
    minify: 'terser', // 混淆器，terser构建后文件体积更小
    chunkSizeWarningLimit: 500, // chunk 大小警告的限制
    // 将 js 和 css 文件夹分离
    rollupOptions: {
      output: {
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
      }
    }
  },
  server: {
    // 服务器主机名，如果允许外部访问，可设置为 "0.0.0.0"
    host: '0.0.0.0'
  },
  plugins: [
    viteImagemin({
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false
      },
      optipng: {
        optimizationLevel: 7
      },
      mozjpeg: {
        quality: 80
      },
      pngquant: {
        quality: [0.8, 0.9],
        speed: 4
      },
      svgo: {
        plugins: [
          {
            name: 'removeViewBox'
          },
          {
            name: 'removeEmptyAttrs',
            active: false
          }
        ]
      }
    })
  ]
})