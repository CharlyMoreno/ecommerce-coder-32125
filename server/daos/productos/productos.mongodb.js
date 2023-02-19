const ContenedorMongoDb = require("../../containers/ContainerMongoDB")
const productosModels = require('../../models/producto_models')

let instancia = null;
class ProductosDaoMongoDB extends ContenedorMongoDb {
    //Patron singleton
    static getInstance(){
        if(!instancia) instancia = new ProductosDaoMongoDB();
        return instancia;
    }
    constructor() {
        super(productosModels);
    }
}

module.exports = ProductosDaoMongoDB;
