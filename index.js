const express = require('express')
const app = express()
const { pokemon } = require('./pokedex.json')

app.get('/', (req, res, next) => {
    res.status(200)
    res.send('Bienvenido')
})

app.get('/pokemon/all', (req, res, next) => {
    res.status(200)
    res.send(pokemon)
})

app.get('/pokemon/:id([0-9]{1,3})', (req, res, next) => {
    const { id } = req.params
    if(id > 0 && id <= 151){
        res.status(200)
        res.send(pokemon[id - 1])
    } 
    else {
        res.status(404)
        res.send('Ese pokemon no existe')
    }
})

app.get('/pokemon/:name', (req, res, next) => {
    const { name } = req.params
    res.status(200)
    res.send(pokemon.find(poke => poke.name = name))
})

app.listen(process.env.PORT || '3000', () => {
    console.log('Servidor activo...')
})