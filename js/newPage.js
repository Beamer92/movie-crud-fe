const { request } = require('./utils')

function addEventListener() {
    
    document.querySelector('.editform').addEventListener('submit', function(e){
        e.preventDefault()
        let title = document.getElementById('newTitle').value
        let director = document.getElementById('newDirector').value
        let rating = document.getElementById('newRating').value
        let year = document.getElementById('newYear').value
        let poster = document.getElementById('newPostURL').value

        request('/', 'post', {title, director, year, rating, poster})
        .then(result => {
            document.querySelector('#newSuccess').classList.remove('hide-confirm')
            setTimeout(() => {
                document.querySelector('#newSuccess').classList.add('hide-confirm')
                window.location = `/show.html?=${result.data[0].id}`
            }, 1000);
        })
        .catch(error => {
            if(error.response.status === 406) {alert("ERROR 406, Invalid Parameters: Ratings must be 1-5")}
            else {
                alert(error)
                window.location = '/home.html'
            }   
        })
    })
}

function init() {  
    addEventListener()
}


module.exports = { init }

