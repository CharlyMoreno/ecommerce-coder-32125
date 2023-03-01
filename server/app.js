const express = require('express')
const { authMiddleware } = require('./middleware/auth.middleware')
const app = express()

//___________________________________________  ROUTES  _________________________________________________ //
const apiProductosRoutes = require('./routes/api.productos.routes')
const authRoutes = require('./routes/auth.routes')
const apiCarritoRoutes = require('./routes/api.carrito.routes')

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/productos',apiProductosRoutes)
app.use('/api/auth',authRoutes)
app.use('/api/carrito', apiCarritoRoutes)

app.get('/',(req, res) => {
    res.status(200).json({"mensaje":"Hola Mundo"})
})

module.exports = {app}
