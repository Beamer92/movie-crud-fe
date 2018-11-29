const { request } = require('./utils')

function getMovie(movieId){
    const purl = document.getElementById('purl')
    const titleDiv = document.getElementById('eTitle')
    const directorDiv = document.getElementById('eDirector')
    const ratingDiv = document.getElementById('eRating')
    const yearDiv = document.getElementById('eYear')
    const posterDiv = document.getElementById('ePostURL')
    request(`/${movieId}`)
    .then(({data}) => {
        purl.src = data.poster
        titleDiv.value = data.title
        directorDiv.value  = data.director
        ratingDiv.value  = data.rating
        yearDiv.value  = data.year
        posterDiv.value  = data.poster

        addEventListener(movieId)
    })
    .catch(error => {
        alert(error)
        window.location = '/home.html'
    })
}

function addEventListener(movieId) {
    document.getElementById('editbtn').addEventListener('click', function(e){
        e.preventDefault()
        let title = document.getElementById('eTitle').value
        let director = document.getElementById('eDirector').value
        let rating = document.getElementById('eRating').value
        let year = document.getElementById('eYear').value
        let poster = document.getElementById('ePostURL').value

        request(`/${movieId}`, 'put', {title, director, rating, year, poster})
        .then(result => {
            document.getElementById('purl').src = poster
            document.querySelector('#success').classList.remove('hide-confirm')
            setTimeout(() => {
                // window.location = `/edit.html?=${movieId}`
                document.querySelector('#success').classList.add('hide-confirm')
            }, 2000);
        })
        .catch(error => {
            alert(error)
            window.location = '/home.html'
        })
    })
}

function init() {  
    const str = window.location.search
    const id = str.substring(str.indexOf('=')+1)
    getMovie(id)
}


module.exports = { init }