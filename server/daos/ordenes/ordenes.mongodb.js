const ContenedorMongoDb = require("../../containers/ContainerMongoDB")
const ordenesModel = require('../../models/orden.models')

let instancia = null;
class OrdenesDaoMongoDB extends ContenedorMongoDb {
    static getInstance(){
        if(!instancia) instancia = new OrdenesDaoMongoDB();
        return instancia;
    }
    constructor() {
        super(ordenesModel);
    }

    async getOrdenesByUser(user){
        try{
            const data = await this.collection.find({user:user}).populate('user')
            return data
        }
        catch(err){
            console.log(err)
        }
    }
}

module.exports = OrdenesDaoMongoDB;

