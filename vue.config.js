const axios = require('axios')

const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir);
}
module.exports = {

  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  indexPath: 'index.html',
  lintOnSave: true,
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("common", resolve("src/common"))
      .set("components", resolve("src/components"))
      .set("api", resolve("src/api"))
    config.module
      .rule('eslint')
      .use('eslint-loader')
      .loader('eslint-loader')
      .tap(options => {
        options.fix = true
        return options
      })
  },
  devServer: {
    before (app) {
      app.get('/api/getTopBanner', function (req, res) {
        const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'
        const jumpPrefixMap = {
          10002: 'https://y.qq.com/n/yqq/album/',
          10014: 'https://y.qq.com/n/yqq/playlist/',
          10012: 'https://y.qq.com/n/yqq/mv/v/'
        }
        axios(url, {
          headers: {
            referer: 'https://i.y.qq.com/',
            host: 'u.y.qq.com'
          },
          params: req.query
        }).then((response) => {
          const responseData = response.data
          if (responseData.code === 0) {
            let slider = responseData.focus.data.content.map(item => {
              const jumpPrefix = jumpPrefixMap[item.type || 10002]
              return Object.assign({}, {
                id: item.id,
                picUrl: item.pic_info.url,
                linkUrl: jumpPrefix + item.jump_info.url + '.html'
              })
            })
            res.json({
              errno: 0,
              data: slider
            })
          }
        }).catch(e => console.log(e))
      })
    }
  }
}