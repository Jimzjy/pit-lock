module.exports = {
  pwa: {
    name: 'Pit Lock',
    themeColor: '#333843'
  },
  chainWebpack: (config) => {
    config
      .plugin('html')
      .tap((args) => {
        args[0].title = 'Pit Lock'
        return args
      })
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require('postcss-pxtorem')({
            rootValue: 37.5,
            selectorBlackList: ['border'],
            propList: ['*']
          })
        ]
      }
    }
  },
  devServer: {
    proxy: {
      '^/graphql': {
        target: 'http://139.224.239.186:3000',
        changeOrigin: true
      }
    }
  }
}
