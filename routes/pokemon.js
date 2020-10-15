const express = require('express')
const pokemon = express.Router()
const db = require('../config/database')

pokemon.get('/', async (req, res, next) => {
    const pokedex = await db.query('SELECT * FROM pokemon')
    res.status(200).json(pokedex)
})

pokemon.post('/', (req, res, next) => {
    const { body } = req
    res.status(200).send(body)
})

pokemon.get('/:id([0-9]{1,3})', async (req, res, next) => {
    const { id } = req.params
    const poke = await db.query(`SELECT * FROM pokemon WHERE pok_id = ${id}`)
    poke.length > 0 
    ? res.status(200).send(poke)
    : res.status(404).send('Ese pokemon no existe')
})

pokemon.get('/:name([A-Za-z]+)', async (req, res, next) => {
    const { name } = req.params
    const poke = await db.query(`SELECT * FROM pokemon WHERE pok_name LIKE '${name}'`)
    poke.length > 0
    ? res.status(200).send(poke) 
    : res.status(404).send('Ese pokemon no existe')
})

module.exports = pokemon