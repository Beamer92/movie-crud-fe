//POST
// request('/auth/token', 'post', { username , password })
// .then(function(response){
//   document.querySelector('#error').classList.add('hide-auth-error')
//   localStorage.setItem('token', response.data.token)
//   window.location = '/protected.html'
// })
// .catch(function(error){
//   document.querySelector('#error').classList.remove('hide-auth-error')
// })

//GET
// request(`/protected/${id}`)
// .then(function(response){
//   console.log(response);
//   document.querySelector('.message').innerHTML = `Hello ${response.data.id}, ${response.data.message}`
// })
// .catch(function(error){
//   console.log(error)
//   document.querySelector('.message').innerHTML = 'You cannot access this resource'
// })

const { request } = require('./utils')

const movTable = document.getElementById('movietable')

function addMovieRows() {
    return request('/')
    .then(result => {
        let data = result.data.movieList
        data.forEach(x => {
            let row = document.createElement('div')
            row.classList.add('row', 'movieRow')
            row.id = x.id
            let title = document.createElement('div')
            title.classList.add('col-md-2')
            let director = document.createElement('div')
            director.classList.add('col-md-2')
            let year = document.createElement('div')
            year.classList.add('col-md-2')
            let rating = document.createElement('div')
            rating.classList.add('col-md-2')
            let editdiv = document.createElement('div')
            editdiv.classList.add('col-md-2')
            let edit = document.createElement('button')
            edit.classList.add('btn')
            let deldiv = document.createElement('div')
            deldiv.classList.add('col-md-2')
            let del = document.createElement('button')
            del.classList.add('btn')
    
            title.innerText = x.title
            director.innerText = x.director
            year.innerText = x.year
            rating.innerText = x.rating
            edit.innerText = 'Edit'
            edit.addEventListener('click', function(e){
                e.preventDefault()
                window.location = `/edit.html?id=${row.id}`
                //let str = window.location.search
                //let id = str.substring(str.indexOf('=')+1)
            })
            del.innerText = 'Delete'
            del.addEventListener('click',function(e){
                e.preventDefault()
                deleteMovie(row.id)
            })
    
            row.appendChild(title)
            row.appendChild(director)
            row.appendChild(year)
            row.appendChild(rating)
            editdiv.appendChild(edit)
            row.appendChild(editdiv)
            deldiv.appendChild(del)
            row.appendChild(deldiv)
            
            movTable.appendChild(row)
            movTable.appendChild(document.createElement('br'))
        })
    })
    .catch((err) => {
        alert(err)
        window.location = '/index.html'
    });

}

function deleteMovie(movieId){

}

function init() {
    addMovieRows()
}


module.exports = {init}