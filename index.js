const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const app = express()
const pokemon = require('./routes/pokemon')

// para que anadir middlewares
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))

app.get('/', (req, res, next) => {
    res.status(200).send('Bienvenido')
})

app.use('/pokemon', pokemon)

app.listen(process.env.PORT || '3000', () => {
    console.log('Servidor activo...')
})