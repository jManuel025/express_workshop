const express = require('express')
const morgan = require('morgan')
const app = express()
const pokemon = require('./routes/pokemon')
const user = require('./routes/user')

// para que anadir middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.get('/', (req, res, next) => {
    res.status(200).json({
        code: 1,
        message: 'Bienvenido' 
    })
})

app.use('/pokemon', pokemon)

app.use('/user', user)

app.use((req, res, next) => {
    res.status(404).json({
        code: 404,
        message: 'Not Found'
    })
})

app.listen(process.env.PORT || '3000', () => {
    console.log('Servidor activo...')
})