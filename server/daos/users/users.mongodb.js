const mongoose = require("mongoose");
const ContainerMongoDB = require('../../containers/ContainerMongoDB')
const usersModels = require('../../models/user.models')

let instancia = null;
class UsersDaoMongoDB extends ContainerMongoDB {
    static getInstance() {
        if (!instancia) instancia = new UsersDaoMongoDB();
        return instancia;
    }
    constructor() {
        super(usersModels);
    }

    async getByUsername(username){
        try{
            const data = await this.collection.findOne({username:username})
            return data
        }
        catch(err){
            console.log(err)
        }
    }

    async deleteUserByUsername(username){
        try{
            const data = await this.collection.deleteOne({ username: username });
            return data
        }
        catch(err){
            console.log(err)
        }
    }

}

module.exports = UsersDaoMongoDB;

