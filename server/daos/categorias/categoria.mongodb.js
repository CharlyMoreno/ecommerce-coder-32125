const ContenedorMongoDb = require("../../containers/ContainerMongoDB")
const categoriaModel = require('../../models/categoria_models')

let instancia = null;
class CategoriaDaoMongoDB extends ContenedorMongoDb {
    static getInstance(){
        if(!instancia) instancia = new CategoriaDaoMongoDB();
        return instancia;
    }
    constructor() {
        super(categoriaModel);
    }
}

module.exports = CategoriaDaoMongoDB;

