const { request } = require('./utils')

function getMovie(movieId){
    const purl = document.getElementById('purl')
    const titleDiv = document.getElementById('showTitle')
    const directorDiv = document.getElementById('showDirector')
    const ratingDiv = document.getElementById('showRating')
    const yearDiv = document.getElementById('showYear')
    request(`/${movieId}`)
    .then(({data}) => {
        purl.src = data.poster
        titleDiv.innerText = 'Title: ' + data.title
        directorDiv.innerText = 'Director: ' + data.director
        ratingDiv.innerText  = 'Our Rating: ' + data.rating
        yearDiv.innerText = 'Release Year: ' + data.year
    })
    .catch(error => {
        alert(error)
        window.location = '/home.html'
    })
}


function init() {  
    const str = window.location.search
    const id = str.substring(str.indexOf('=')+1)
    getMovie(id)
}


module.exports = { init }