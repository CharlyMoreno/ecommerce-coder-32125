const express = require('express')
const app = express()
const {engine} = require('express-handlebars')
const cookies = require('cookie-parser')

//___________________________________________  ROUTES  _________________________________________________ //
const apiProductosRoutes = require('./routes/api.productos.routes')
const authRoutes = require('./routes/api.auth.routes')
const apiCarritoRoutes = require('./routes/api.carrito.routes')
const apiMensajes = require('./routes/api.mensajes.routes')
const apiCategorias = require('./routes/api.categorias.routes')
const infoRoutes = require('./routes/info.routes')

const viewsAuthRoutes = require('./routes/views.auth.routes')
const viewsRoutes = require('./routes/views.routes')

app.use(cookies())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'));

// ________________________ HANDLEBARS __________________________
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

app.use('/api/productos',apiProductosRoutes)
app.use('/api/auth',authRoutes)
app.use('/api/carrito', apiCarritoRoutes)
app.use('/api/chat', apiMensajes)
app.use('/api/categorias', apiCategorias)
app.use('/info',infoRoutes)

app.use('/auth',viewsAuthRoutes)
app.use('/',viewsRoutes)

module.exports = {app}
 