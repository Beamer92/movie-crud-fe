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
            let titlediv = document.createElement('div')
            titlediv.classList.add('col-md-2')
            let titlespan = document.createElement('span')
            let directordiv = document.createElement('div')
            directordiv.classList.add('col-md-2')
            let directorspan = document.createElement('span')
            let yeardiv = document.createElement('div')
            yeardiv.classList.add('col-md-2')
            let yearspan = document.createElement('span')
            let ratingdiv = document.createElement('div')
            ratingdiv.classList.add('col-md-2')
            let ratingspan = document.createElement('span')

            let editdiv = document.createElement('div')
            editdiv.classList.add('col-md-2')
            let edit = document.createElement('button')
            edit.classList.add('btn', 'btn-info')
            let deldiv = document.createElement('div')
            deldiv.classList.add('col-md-2')
            let del = document.createElement('button')
            del.classList.add('btn', 'btn-danger')
    
            titlespan.innerText = x.title
            directorspan.innerText = x.director
            yearspan.innerText = x.year
            ratingspan.innerText = x.rating
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
    
            titlediv.appendChild(titlespan)
            row.appendChild(titlediv)
            directordiv.appendChild(directorspan)
            row.appendChild(directordiv)
            yeardiv.appendChild(yearspan)
            row.appendChild(yeardiv)
            ratingdiv.appendChild(ratingspan)
            row.appendChild(ratingdiv)
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
    return request(`/${movieId}`, 'delete')
    .then(function(){
        location.reload();
    })
    .catch(function(error){
        alert(error)
        location.reload();
    })
}

function init() {
    addMovieRows()
}


module.exports = {init}