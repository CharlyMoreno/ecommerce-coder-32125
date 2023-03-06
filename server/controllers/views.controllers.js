const UserServices = require('../services/auth.services')
const MensajesServices = require('../services/mensajes.services')
const ProductosServices = require('../services/productos.services')
const CarritoServices = require('../services/carrito.services')
const OrdenesServices = require('../services/ordenes.services')
const CategoriaServices = require('../services/categoria.services')

const {logger} = require('../utils/logger')

const CarritoException = require('../utils/exceptions/carrito.exceptions')

const {checkValidation} = require('../middleware/validation.middleware');
const ValidationError = require('../utils/exceptions/validation.exceptions')

const {getCurrentUser} = require('../utils/getCurrentUser')

class ViewsController {
    static getIndex = async (req,res) => {
        try{
            const user = await getCurrentUser(req.cookies.access_token)
            res.render('index',{user:user})
        }
        catch(error) {
            res.status(500).json({"error":"Ocurrio un error"})
            logger.error(error)
        }
    }
    
    static getMensajes = async (req,res) => {
        try{
            const user = await getCurrentUser(req.cookies.access_token)
            const mensajes = await MensajesServices.getAllMensajes()
            res.render('mensajes',{user:user,mensajes:mensajes})
        }
        catch(error) {
            res.status(500).json({"error":"Ocurrio un error"})
            logger.error(error)
        }
    }
    
    static postMensajes = async (req,res) => {
        try{
            const data = req.body
            const mensaje = await MensajesServices.guardarMensaje(data, req.idUser)
            res.redirect('/chat')
        }
        catch(error) {
            res.status(500).json({"error":"Ocurrio un error"})
            logger.error(error)
        }
    }
    
    static getViewsProductos = async (req,res) => {
        try{
            const productos = await ProductosServices.getAll()
            const user = await getCurrentUser(req.cookies.access_token)
            res.render('productos',{productos:productos,user:user})
        }
        catch(error) {
            res.status(500).json({"error":"Ocurrio un error"})
            logger.error(error)
        }
    }
    
    static getCarrito = async (req,res) => {
        try{
            const carrito = await CarritoServices.getCarritoByUser(req.idUser)
            const user = await getCurrentUser(req.cookies.access_token)
            res.render('carrito',{carrito:carrito,user:user})
        }
        catch(error) {
            if(error instanceof CarritoException) res.render('carrito',{error:error.message})
            else res.status(500).json({"error":"Ocurrio un error"})
            logger.error(error)
        }
    }
    
    static addProductoCarrito = async (req,res) => {
        try{
            const idProducto = req.params.idProducto
            const cantProducto = req.params.cantProducto
            const idUser = req.idUser
            await CarritoServices.addProduct(idUser,idProducto,parseInt(cantProducto))
            res.redirect('/carrito')
        }
        catch(error) {
            if(error instanceof CarritoException) res.render('carrito',{error:error.message})
            else res.status(500).json({"error":"Ocurrio un error"})
            logger.error(error)
        }
    }
    
    static deleteProductoCarrito = async (req,res) => {
        try{
            const idProducto = req.params.idProducto
            const idUser = req.idUser
            await CarritoServices.deleteProduct(idUser,idProducto)
            res.redirect('/carrito')
        }
        catch(error) {
            if(error instanceof CarritoException) res.render('carrito',{error:error.message})
            else res.status(500).json({"error":"Ocurrio un error"})
            logger.error(error)
        }
    }
    
    static confirmarCompra = async (req,res) => {
        try{
            const idUser = req.idUser
            await CarritoServices.confirmarCompra(idUser)
            res.redirect('/ordenes')
        }
        catch(error) {
            if(error instanceof CarritoException) res.render('carrito',{error:error.message})
            else res.status(500).json({"error":"Ocurrio un error"})
            logger.error(error)
        }
    }
    
    static getOrdenes = async (req,res) => {
        try{
            const ordenes = await OrdenesServices.getOrdenesByUser(req.idUser)
            const user = await getCurrentUser(req.cookies.access_token)
            res.render('ordenes',{ordenes:ordenes,user:user})
        }
        catch(error) {
            res.status(500).json({"error":"Ocurrio un error"})
            logger.error(error)
        }
    }
    
    static getOrdenesByID = async (req,res) => {
        try{
            const orden = await OrdenesServices.getOrdenesByID(req.params.idOrden)
            const ordenUserID = orden.user.id
            const idUser = req.idUser
            const user = await getCurrentUser(req.cookies.access_token)
            if(ordenUserID == idUser) res.render('ordenesDetails',{orden:orden,user:user})
            else res.render('ordenesDetails',{error:"No puedes acceder a una orden que no sea de tu usuario.",user:user})
    
        }
        catch(error) {
            res.status(500).json({"error":"Ocurrio un error"})
            logger.error(error)
        }
    }
    
    static getCrudProductos = async (req,res) => {
        try{
            const productos = await ProductosServices.getAll()
            const user = await getCurrentUser(req.cookies.access_token)
            res.render('crudProductos',{productos:productos,user:user})
        }
        catch(error) {
            res.status(500).json({"error":"Ocurrio un error"})
            logger.error(error)
        } 
    }
    
    static getViewCrearProductos = async (req,res) => {
        try{
            const categorias = await CategoriaServices.getAll();
            const user = await getCurrentUser(req.cookies.access_token)
            res.render('crearProducto',{categorias:categorias,user:user})
        }
        catch(error) {
            res.status(500).json({"error":"Ocurrio un error"})
            logger.error(error)
        } 
    }
    
    static postCrearProductos = async (req,res) => {
        try{
            checkValidation(req)
            const productoObject = req.body;
            await ProductosServices.save(productoObject);
            res.redirect('/crud/productos')
        }
        catch(error){
            if(error instanceof ValidationError) res.render('crearProducto',{error:error.data.data[0].msg})
            else{
                res.status(500).json({"error":"Ocurrio un error"})
                logger.error(error)
            }
        }
    }

    static getEditarProductos = async (req,res) => {
        try{
            const producto = await ProductosServices.getById(req.params.idProducto)
            const categorias = await CategoriaServices.getAll();
            const user = await getCurrentUser(req.cookies.access_token)
            res.render('editarProducto',{producto:producto,categorias:categorias,user:user})
        }
        catch(error){
            if(error instanceof ValidationError) res.render('editarProducto',{error:error.data.data[0].msg})
            else{
                res.status(500).json({"error":"Ocurrio un error"})
                logger.error(error)
            }
        }
    }

    static postEditarProductos = async (req,res) => {
        try{
            checkValidation(req)
            const productoObject = req.body;
            const idProducto = req.params.idProducto
            await ProductosServices.update(idProducto,productoObject);
            res.redirect('/crud/productos')
        }
        catch(error){
            if(error instanceof ValidationError) res.render('editarProducto',{error:error.data.data[0].msg})
            else{
                res.status(500).json({"error":"Ocurrio un error"})
                logger.error(error)
            }
        }
    }

}



module.exports = ViewsController