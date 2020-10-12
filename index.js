const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const { pokemon } = require('./pokedex.json')

// para que anadir middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))

app.get('/', (req, res, next) => {
    res.status(200).send('Bienvenido')
})

app.get('/pokemon', (req, res, next) => {
    res.status(200).send(pokemon)
})

app.post('/pokemon', (req, res, next) => {
    const { body } = req
    res.status(200).send('poke post')
})

app.get('/pokemon/:id([0-9]{1,3})', (req, res, next) => {
    const { id } = req.params
    id > 0 && id <= 151 
    ? res.status(200).send(pokemon[id - 1])
    : res.status(404).send('Ese pokemon no existe')
})

app.get('/pokemon/:name([A-Za-z]+)', (req, res, next) => {
    const { name } = req.params
    const poke = pokemon.find(p => p.name.toUpperCase() == name.toUpperCase())
    poke 
    ? res.status(200).send(poke) 
    : res.status(404).send('Ese pokemon no existe')
})

app.listen(process.env.PORT || '3000', () => {
    console.log('Servidor activo...')
})