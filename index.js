const express = require('express')
const morgan = require('morgan')
const app = express()
// Routers
const pokemon = require('./routes/pokemon')
const user = require('./routes/user')
// Middleware
const auth = require('./middleware/auth')
const notFound = require('./middleware/notFound')

app.use(morgan('dev'))

app.use(express.json())

app.use(express.urlencoded({ extended: true}))

app.get('/', (req, res, next) => res.status(200).json( {code: 1, message: 'Bienvenido'} ))

app.use('/user', user)

app.use(auth)

app.use('/pokemon', pokemon)

app.use(notFound)

app.listen(process.env.PORT || '3000', () => {
    console.log('Servidor activo...')
})