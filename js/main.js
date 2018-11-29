const index = require('./index')
const home = require('./home')
const edit = require('./edit')
const newP = require('./newPage')

const pageInitialization = {
  '/' : index.init,
  '/index.html': index.init,
  '/home.html' : home.init,
  '/edit.html' : edit.init,
  '/newPage.html' : newP.init
}

const path = window.location.pathname
 
if(pageInitialization.hasOwnProperty(path)) {
  pageInitialization[path]()
}
else {
  console.error(`${path} does not have an initializer`)
}

