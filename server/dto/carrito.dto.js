const {asDto : asDtoProductos} = require('./producto.dto')
const {asDto : asDtoUser} = require('./user.dto')

class DtoCarrito {
  constructor(carrito) {
    this.user = asDtoUser(carrito.user),
    this.id = carrito.id
    this.productos = [];
    this.total = 0;
    if (carrito.productos.length > 0) {
      carrito.productos.forEach((element) => {
          this.productos.push({
            producto: asDtoProductos(element.producto),
            cantidad: element.cantidad,
            precioAcumulado: element.cantidad * element.producto.precio
          })
          this.total += element.cantidad * element.producto.precio
      });
    }
  }
}

function asDto(carrito) {
  if (Array.isArray(carrito))
      return carrito.map(p => new DtoCarrito(p))
  else
      return new DtoCarrito(carrito)
}

module.exports = {asDto};
