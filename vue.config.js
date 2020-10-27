module.exports = {
    publicPath: './',
    outputDir: 'dist',//在vue-cli.3.3版本后 baseUrl被废除了，因此这边要写成 publicPath。
    lintOnSave: true,
    runtimeCompiler: true, 
    chainWebpack: () => {},
    configureWebpack: () => {},
    devServer: {
      open: process.platform === 'darwin',
      host: 'localhost',
      port: 8080,
      https: false,
      hotOnly: false,
      proxy: null,
      before: app => {}
    }
  }