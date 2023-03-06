class DtoCategoria {
    constructor(categoria) {
        this.nombre = categoria.nombre,
        this.id = categoria.id
    }
}

function asDto(categoria) {
    if (Array.isArray(categoria))
        return categoria.map(p => new DtoCategoria(p))
    else
        return new DtoCategoria(categoria)
}

  
 module.exports = {asDto};
  