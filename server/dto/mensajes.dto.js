class DtoMensajes {
    constructor(mensaje) {
        this.texto = mensaje.texto,
        this.timestamp = new Date(mensaje.timestamp).toDateString(),
        this.user = {
            username:mensaje.user.username,
            email:mensaje.user.email,
        }
    }
}

function asDto(mensaje) {
    if (Array.isArray(mensaje))
        return mensaje.map(p => new DtoMensajes(p))
    else
        return new DtoMensajes(mensaje)
}

  
 module.exports = {asDto};
  