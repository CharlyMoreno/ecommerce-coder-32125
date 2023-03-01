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

    async updateStock(id,newStock){
        try{
            const data = await this.collection.findByIdAndUpdate(id,{stock:newStock})
            return data
        }
        catch(err){
            console.log(err)
        }
    }
}

module.exports = ProductosDaoMongoDB;
