class ValidationException extends Error{
    constructor(msg,data){
        super(msg)
        this.status = 400,
        this.data = data
        this.message = msg
    }
}

module.exports = ValidationException