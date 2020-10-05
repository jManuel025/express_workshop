const express = require('express')
const app = express()

app.get('/', (req, res, next) => {
    res.status(200)
    res.send('Hola Mundo')
})

app.listen('3000', () => {
    console.log('Servidor activo...')
})