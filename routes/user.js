const express = require('express')
const user = express.Router()
const db = require('../config/database')

user.post('/', async (req, res, next) => {
    const { user_name, user_mail, user_password } = req.body
    if(user_name && user_mail && user_password){
        let query = 'INSERT INTO user(user_name, user_mail, user_password) '
        query += `VALUES ('${user_name}', '${user_mail}', '${user_password}')`
        const rows = await db.query(query)
        rows.affectedRows == 1
        && res.status(201).json({
            code: 201,
            message: 'Usuario creado correctamente'
        })
        
        res.status(500).json({
            code: 500,
            message: 'Ocurrio un error'
        }) 
    }
    res.status(500).json({
        code: 500,
        message: 'Campos incompletos'
    }) 
})

user.get('/', async (req, res, next) => {
    const query = 'SELECT * FROM user'
    const rows = await db.query(query)
    res.status(200).json({
        code: 200,
        message: rows
    })
})

module.exports = user