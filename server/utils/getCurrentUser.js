const {decodedToken} = require('../middleware/views.auth.middleware')
const UserServices = require('../services/auth.services')

const {asDto} = require('../dto/user.dto')

const getCurrentUser = async (token) => {
    if(token){
        const idUser = decodedToken(token).idUser
        const user = await UserServices.getUserById(idUser)
        if(user) return asDto(user)
    }
    return null
}

module.exports = {getCurrentUser}