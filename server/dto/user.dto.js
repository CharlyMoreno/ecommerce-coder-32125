class DtoUser {
    constructor(user) {
        this.id = user.id,
        this.nombre = user.nombre,
        this.username = user.username,
        this.email = user.email,
        this.fotoPerfil = user.fotoPerfil
    }
}

function asDto(user) {
    if (Array.isArray(user))
        return user.map(p => new DtoUser(p))
    else
        return new DtoUser(user)
}

  
 module.exports = {asDto};
  