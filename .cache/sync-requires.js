const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => (m && m.default) || m


exports.components = {
  "component---src-pages-404-jsx": hot(preferDefault(require("/Users/shelbygreen/github/acc-map/src/pages/404.jsx"))),
  "component---src-pages-index-js": hot(preferDefault(require("/Users/shelbygreen/github/acc-map/src/pages/index.js")))
}

