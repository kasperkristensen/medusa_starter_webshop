module.exports = [{
      plugin: require('../node_modules/gatsby-plugin-image/gatsby-browser.js'),
      options: {"plugins":[]},
    },{
      plugin: require('../node_modules/gatsby-plugin-react-redux/gatsby-browser.js'),
      options: {"plugins":[],"pathToCreateStoreModule":"./src/state/createStore","serialize":{"space":0,"isJSON":true,"unsafe":false,"ignoreFunction":true},"cleanupOnClient":true,"windowKey":"__PRELOADED_STATE__"},
    }]
