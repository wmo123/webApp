
var path = require('path')
function resolve(dir) {
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
  }
}