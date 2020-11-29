module.exports = [{
      plugin: require('../node_modules/gatsby-plugin-typography/gatsby-browser.js'),
      options: {"plugins":[],"pathToConfigModule":"./config/typography.js"},
    },{
      plugin: require('../node_modules/gatsby-plugin-catch-links/gatsby-browser.js'),
      options: {"plugins":[]},
    },{
      plugin: require('../node_modules/gatsby-plugin-manifest/gatsby-browser.js'),
      options: {"plugins":[],"name":"Data Explorer","short_name":"TBD","description":"An interactive database to explore climate-releated data at the state legislative district level.","start_url":"/?utm_source=a2hs","background_color":"#253688","theme_color":"#253688","display":"standalone","icon":"src/images/clicab-icon.jpg","cache_busting_mode":"query","include_favicon":true,"legacy":true,"theme_color_in_head":true,"cacheDigest":"51723acbd2c6545c9d2dd9c16841bbb4"},
    }]
