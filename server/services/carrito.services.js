const CarritoDaoFactory = require("../daos/factory/carritos.daoFactory");
const carritoDao = CarritoDaoFactory.getDao();

const ProductoServices = require('./productos.services')
const OrdenesServices = require('./ordenes.services')

const CarritoException = require('../utils/exceptions/carrito.exceptions')

const {enviarMailCompra} = require('../utils/emails/compra.email')

function asDto(carrito){
    return carrito;
}

async function crearCarrito(user){
    const carritoNew = {
        timestamp: new Date(),
        productos: [],
        user: user,
    };
    const carrito = await carritoDao.save(carritoNew);
    return carrito;
}

const confirmarCompra = async (currentUser) => {
    const carrito = await carritoDao.getCarritoByUser(currentUser);
    if(!carrito) throw new CarritoException("El usuario no posee un carrito")
    
    //Chequeo que todos los productos tengan stock suficiente
    carrito.productos.forEach(element => {
      if(element.producto.stock < element.cantidad) throw new CarritoException(`Stock insuficiente para ${element.producto.nombre}`)
    });

    const orden = {
      timestamp: new Date(),
      user: carrito.user,
      productos:[]
    }

    //Actualizo stock.
    carrito.productos.forEach(async element => {
      const producto = element.producto
      const newStock = producto.stock -= element.cantidad
      // await ProductoServices.updateStock(producto.id,newStock)

      //Agrego producto a la orden
      orden.productos.push({producto:{nombre:producto.nombre,foto:producto.foto,precio:producto.precio},cantidad:element.cantidad})
    });

    await OrdenesServices.save(orden)
    
    enviarMailCompra(carrito)
    
    await carritoDao.deleteById(carrito._id);
    
    return carrito

}

const deleteProduct = async (currentUser,idProduct) => {
  if(!idProduct) throw new CarritoException("Parametros invalidos.")

  const carrito = await carritoDao.getCarritoByUser(currentUser);
  if(!carrito) throw new CarritoException("El usuario no posee un carrito.")

  const producto = await ProductoServices.getById(idProduct)
  if(!producto) throw new ProductoServices("Producto invalido.")

  const indexProducto = carrito.productos.findIndex(element => element.producto == producto.id)    
  if(indexProducto == -1) throw new CarritoException("El carrito no contiene este producto.")
  else{
    //Elimino el producto del carrito
    carrito.productos.splice(indexProducto,1)
  }

  //Actualizo el carrito
  const carritoUpdated = await carritoDao.update(carrito.id, carrito);

  return carritoUpdated

}


const addProduct = async (currentUser,idProduct,cantidad) => {
  if(!idProduct || cantidad <= 0) throw new CarritoException("Parametros invalidos.")
  
  const carrito = await carritoDao.getCarritoByUser(currentUser);
  if(!carrito) throw new CarritoException("El usuario no posee un carrito.")

  const producto = await ProductoServices.getById(idProduct)
  if(!producto) throw new ProductoServices("Producto invalido.")
  
  const indexProducto = carrito.productos.findIndex(element => element.producto == producto.id)    
  if(indexProducto == -1){
    if(producto.stock < cantidad) throw new CarritoException(`Stock insuficiente para ${producto.nombre}`)
    //No tiene el producto ya agregado al carrito
    const productoCantidad = {
      producto: producto,
      cantidad: cantidad
    }
    carrito.productos.push(productoCantidad);
  }
  else{
    //Ya tiene el producto agregado por lo que modifico la cantidad
    const newCantidad = carrito.productos[indexProducto].cantidad + cantidad
    if(producto.stock < newCantidad) throw new CarritoException(`Stock insuficiente para ${producto.nombre}`)
    carrito.productos[indexProducto].cantidad = newCantidad
  }

  //Actualizo el carrito
  const carritoUpdated = await carritoDao.update(carrito.id, carrito);

  return carritoUpdated
}

const getCarritoByUser = async (currentUser) => {
    let carrito = await carritoDao.getCarritoByUser(currentUser);
    if (!carrito) carrito = crearCarrito(currentUser)
    return asDto(carrito);
} 

module.exports = {confirmarCompra,getCarritoByUser,addProduct,deleteProduct}