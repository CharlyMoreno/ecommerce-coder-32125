const mongoose = require("mongoose");

//___________________________________________  LOGS  _________________________________________________ //
const {logger} = require('../utils/logger')
//___________________________________________  CONFIG  _________________________________________________ //
const config = require('../utils/config')

// Set up default mongoose connection
const mongoDB = config.MONGOURL;
mongoose.set("strictQuery", false);
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

// Get the default connection
const db = mongoose.connection;
logger.info(`✅ Base de datos conectada correctamente.`)

// Bind connection to error event (to get notification of connection errors)
db.on("error", err => {
    logger.error(`MongoDB connection error: ${err}`)
});
class ContenedorMongoDb{
    constructor(model){
        this.collection = model;
    }

    async getAll(){
        try{
            const data = await this.collection.find();
            return data;
        }
        catch(err){
            logger.error(err)
        }
    }

    async getById(id){
        try{
            const data = await this.collection.findOne({_id:id})
            return data
        }
        catch(err){
            logger.error(err)
        }
    }

    async save(objeto) {
        try{
            const doc = await this.collection.create(objeto);
            return doc; 
        }
        catch(err){
            logger.error(err)
        }
    }
    
    async update(id, newObject) {
        try{
            const objetoBuscado = await this.getById(id)
            if(!objetoBuscado){
                return false //No encontrado
            }
            else{
                const data = await this.collection.findByIdAndUpdate(id,newObject);
                return data;
            }
        }
        catch(err){
            logger.error(err)
        }
      }
    
    async deleteById(id){
        try{
            const objetoBuscado = await this.getById(id)
            if(!objetoBuscado){
                return false //No encontrado
            }
            else{
                await this.collection.findByIdAndDelete(id);
                return true; // Eliminado correctamente
            }
        }
        catch(err){
            logger.error(err)
        }
    }

}


module.exports = ContenedorMongoDb;