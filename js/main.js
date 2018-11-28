const index = require('./index')
const home = require('./home')



const pageInitialization = {
  '/' : index.init,
  '/index.html': index.init,
  '/home.html' : home.init
}

const path = window.location.pathname
 
if(pageInitialization.hasOwnProperty(path)) {
  pageInitialization[path]()
}
else {
  console.error(`${path} does not have an initializer`)
}

