const express = require('express')
const { authMiddleware } = require('./middleware/auth.middleware')
const app = express()
const {engine} = require('express-handlebars')
//___________________________________________  ROUTES  _________________________________________________ //
const apiProductosRoutes = require('./routes/api.productos.routes')
const authRoutes = require('./routes/auth.routes')
const apiCarritoRoutes = require('./routes/api.carrito.routes')
const apiMensajes = require('./routes/api.mensajes.routes')
const infoRoutes = require('./routes/info.routes')

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// ________________________ HANDLEBARS __________________________
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

app.use('/api/productos',apiProductosRoutes)
app.use('/api/auth',authRoutes)
app.use('/api/carrito', apiCarritoRoutes)
app.use('/api/chat', apiMensajes)
app.use('/info',infoRoutes)

module.exports = {app}
 