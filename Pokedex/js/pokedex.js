let headers = { }
const url = 'http://localhost:3000'

const init = () => {
    if(localStorage.getItem('token')) {
        headers = {
            headers: {
                'Authorization': `bearer ${localStorage.getItem('token')}`
            }
        }
        loadPokemon()
    }
    else {
        window.location.href = 'index.html'
    }
}

const loadPokemon = () => {
    axios.get(`${url}/pokemon`, headers)
    .then(res => {
        console.log(res)
        displayPokemon(res.data.message)
    }).catch(err => {
        console.log(err)
    })
}

const displayPokemon = (pokemon) => {
    let body = document.querySelector('body')
    pokemon.map((poke) => {
        body.innerHTML += `<h3>${poke.pok_name}</h3>`
    })
    // for(let i = 0; i< pokemon.length; i++){
    //     body.innerHTML += `<h3>${pokemon[i].pok_name}</h3>`
    // }
}
window.onload = init