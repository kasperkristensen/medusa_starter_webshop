
// prefer default export if available
const preferDefault = m => (m && m.default) || m


exports.components = {
  "component---cache-dev-404-page-js": preferDefault(require("/Users/kasperf.kristensen/gatsby-starter-medusa/.cache/dev-404-page.js")),
  "component---src-pages-404-js": preferDefault(require("/Users/kasperf.kristensen/gatsby-starter-medusa/src/pages/404.js")),
  "component---src-pages-checkout-payment-js": preferDefault(require("/Users/kasperf.kristensen/gatsby-starter-medusa/src/pages/checkout/payment.js")),
  "component---src-pages-checkout-success-js": preferDefault(require("/Users/kasperf.kristensen/gatsby-starter-medusa/src/pages/checkout/success.js")),
  "component---src-pages-index-js": preferDefault(require("/Users/kasperf.kristensen/gatsby-starter-medusa/src/pages/index.js"))
}

