const {asDto: asDtoCategoria} = require('../dto/categoria.dto')

class DtoProducto {
    constructor(producto) {
        this.nombre= producto.nombre,
        this.precio= producto.precio,
        this.foto=   producto.foto,
        this.id= producto._id,
        this.descripcion= producto.descripcion,
        this.codigo = producto.codigo,
        this.stock = producto.stock,
        this.categoria =producto.categoria
    }
}

function asDto(prod) {
    if (Array.isArray(prod))
        return prod.map(p => new DtoProducto(p))
    else
        return new DtoProducto(prod)
}

  
 module.exports = {asDto};
  