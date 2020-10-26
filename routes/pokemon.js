const express = require('express')
const pokemon = express.Router()
const db = require('../config/database')

pokemon.get('/', async (req, res, next) => {
    const pokedex = await db.query('SELECT * FROM pokemon')
    res.status(200).json({
        code: 1,
        message: pokedex
    })
})

pokemon.post('/', async (req, res, next) => {
    const { pok_name, pok_height, pok_weight, pok_base_experience } = req.body
    if (pok_name && pok_height && pok_weight && pok_base_experience ) {
        let query = 'INSERT INTO pokemon(pok_name, pok_height, pok_weight, pok_base_experience) '
        query += `VALUES('${pok_name}', ${pok_height}, ${pok_weight}, ${pok_base_experience})`
        const rows = await db.query(query)
        rows.affectedRows == 1
        ? res.status(201).json({
            code: 201,
            message: 'Pokemon insertado correctamente'
        })
        : res.status(404).json({
            code: 404,
            message: 'Falló inserción'
        })
    }
    res.status(500).json({
        code: 500,
        message: 'Campos incompletos'
    })
})

pokemon.get('/:id([0-9]{1,3})', async (req, res, next) => {
    const { id } = req.params
    const poke = await db.query(`SELECT * FROM pokemon WHERE pok_id = ${id}`)
    poke.length > 0 
    ? res.status(200).json({
        code: 200,
        message: poke
    })
    : res.status(404).json({
        code: 404,
        message: 'Ese pokemon no existe'
    })
})

pokemon.get('/:name([A-Za-z]+)', async (req, res, next) => {
    const { name } = req.params
    const poke = await db.query(`SELECT * FROM pokemon WHERE pok_name LIKE '${name}'`)
    poke.length > 0
    ? res.status(200).json({
        code: 200,
        message: poke
    })
    : res.status(404).json({
        code: 404,
        message: 'Ese pokemon no existe'
    })
})

pokemon.delete('/:id([0-9]{1,3})', async (req, res, next) => {
    const { id } = req.params
    const query = `DELETE FROM pokemon WHERE pok_id = ${id}`
    const rows = await db.query(query)
    rows.affectedRows
    ? res.status(200).json({
        code: 200,
        message: 'Pokemon borrado correctamente'
    })
    : res.status(404).json({
        code: 404,
        message: 'Pokemon no encontrado'
    })
})

pokemon.put('/:id([0-9]{1,3})', async (req, res, next) => {
    const { id } = req.params
    const { pok_name, pok_height, pok_weight, pok_base_experience } = req.body

    if (pok_name && pok_height && pok_weight && pok_base_experience ) {
        let query = `UPDATE pokemon SET pok_name='${pok_name}',pok_height=${pok_height},pok_weight=${pok_weight},pok_base_experience=${pok_base_experience} WHERE pok_id = ${id}`
        const rows = await db.query(query)
        rows.affectedRows == 1
        ? res.status(200).json({
            code: 200,
            message: 'Pokemon actualizado correctamente'
        })
        : res.status(404).json({
            code: 404,
            message: 'Falló actualizacion'
        })
    }
    res.status(500).json({
        code: 500,
        message: 'Campos incompletos'
    })
})

pokemon.patch('/:id([0-9]{1,3})', async (req, res, next) => {
    const { id } = req.params
    const { pok_name } = req.body
    if(pok_name){
        let query = `UPDATE pokemon SET pok_name='${pok_name}' WHERE pok_id = ${id}`
        const rows = await db.query(query)
        rows.affectedRows == 1
        ? res.status(200).json({
            code: 200,
            message: 'Pokemon actualizado correctamente'
        })
        : res.status(500).json({
            code: 500,
            message: 'Ocurrio un error'
        })
    }
    res.status(500).json({
        code: 500,
        message: 'Campos incompletos'
    })
})

module.exports = pokemon