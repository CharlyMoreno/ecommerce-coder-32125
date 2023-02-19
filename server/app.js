const express = require('express')
const app = express()

//___________________________________________  ROUTES  _________________________________________________ //
const apiProductosRoutes = require('./routes/api.productos.routes')

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/productos',apiProductosRoutes)

app.get('/',(req, res) => {
    res.status(200).json({"mensaje":"Hola Mundo"})
})

module.exports = {app}
