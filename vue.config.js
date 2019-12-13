const path = require('path')

module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],

  configureWebpack: {
    externals: {
      vue: 'Vue'
    }
  },

  pluginOptions: {
    s3Deploy: {
      registry: undefined,
      awsProfile: 'default',
      region: 'ap-northeast-2',
      bucket: 'as4657-mybucket',
      createBucket: false,
      staticHosting: true,
      staticIndexPage: 'index.html',
      staticErrorPage: 'index.html',
      assetPath: 'dist',
      assetMatch: '**',
      deployPath: '/',
      acl: 'public-read',
      pwa: false,
      enableCloudfront: true,
      uploadConcurrency: 5,
      pluginVersion: '3.0.0',
      cloudfrontId: 'E265OWTC1EMTMC',
      cloudfrontMatchers: '/*'
    }
  }
}
