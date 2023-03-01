class CarritoException extends Error{
    constructor(msg,data){
        super(msg)
        this.status = 406,
        this.data = data
        this.message = msg
    }
}


module.exports = CarritoException