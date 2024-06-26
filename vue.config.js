/*
 * @Description: 配置文件
 */
module.exports = {
  publicPath: './',
  devServer: {
    open: true,
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000/', // 本地后端地址
        // target: 'http://101.132.181.9:3000/', // 线上后端地址
        changeOrigin: true, //允许跨域
        pathRewrite: {
          '^/api': '/api'
        }
      }
    }
  }
}