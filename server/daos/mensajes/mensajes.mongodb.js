const ContenedorMongoDb = require("../../containers/ContainerMongoDB")
const mensajesModel = require('../../models/mensajes.models')

let instancia = null;
class MensajesMongoDB extends ContenedorMongoDb {
    static getInstance(){
        if(!instancia) instancia = new MensajesMongoDB();
        return instancia;
    }
    constructor() {
        super(mensajesModel);
    }
    async getMensajesByEmail(email){
        try{
            const data = await this.collection.find().populate({path:'user',match:{email:email}})
            return data
        }
        catch(err){
            console.log(err)
        }
    }
}

module.exports = MensajesMongoDB;

