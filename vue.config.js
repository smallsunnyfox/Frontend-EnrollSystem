const path = require('path')
const pkg = require('./package.json')
const name = pkg.name || 'enroll'

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: '/', // 基本路径
  outputDir: 'dist', // 输出文件目录
  assetsDir: 'static', // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
  lintOnSave: process.env.NODE_ENV !== 'production',
  productionSourceMap: false, // 生产环境是否生成 sourceMap 文件
  devServer: {
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:7040/',
        changeOrigin: true, // 允许websockets跨域
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    } // 代理转发配置，用于调试环境
  },
  /*
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require('postcss-pxtorem')({
            rootValue: 40, // 换算的基数
            selectorBlackList: ['element-ui'], // 忽略转换正则匹配项
            propList: ['*'],
          }),
        ]
      }
    }
  },*/
  // webpack配置
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
      config.mode = 'production'
    } else {
      // 为开发环境修改配置...
      config.mode = 'development'
    }
    Object.assign(config, {
      // 开发生产共同配置
      name: name,
      resolve: {
        alias: {
          '@': resolve('src'),
          '@c': resolve('./src/components')
        } // 别名配置
      }
    })
  },
  chainWebpack(config) {
    config
      .when(process.env.NODE_ENV === 'development',
        config => config.devtool('cheap-source-map')
      )

    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
              // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end()
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // only package third parties that are initially dependent
                },
                elementUI: {
                  name: 'chunk-elementUI', // split elementUI into a single package
                  priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test: /[\\/]node_modules[\\/]element-ui[\\/]/
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'), // can customize your rules
                  minChunks: 3, //  minimum common number
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          config.optimization.runtimeChunk('single')
        }
      )
  }
}
