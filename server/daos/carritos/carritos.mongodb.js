const ContenedorMongoDb = require("../../containers/ContainerMongoDB")
const carritosModel = require('../../models/carrito.models')

let instancia = null;
class CarritoDaoMongoDB extends ContenedorMongoDb {
    static getInstance(){
        if(!instancia) instancia = new CarritoDaoMongoDB();
        return instancia;
    }
    constructor() {
        super(carritosModel);
    }

    async getCarritoByUser(user){
        try{
            const data = await this.collection.findOne({user:user}).populate('user').populate('productos.producto')
            return data
        }
        catch(err){
            console.log(err)
        }
    }
}

module.exports = CarritoDaoMongoDB;

