const {asDto : asDtoProductos} = require('./producto.dto')

class DtoOrdenes {
    constructor(orden) {
        this.id = orden.id
        this.timestamp = new Date(orden.timestamp).toLocaleDateString('en-GB')
        this.user = {
            username:orden.user.username,
            email:orden.user.email,
            id: orden.user.id
        }
        this.productos = [];
        this.total = 0;
        if (orden.productos.length > 0) {
            orden.productos.forEach((element) => {
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

function asDto(orden) {
    if (Array.isArray(orden))
        return orden.map(p => new DtoOrdenes(p))
    else
        return new DtoOrdenes(orden)
}

  
 module.exports = {asDto};
  