class UnauthorizedException extends Error{
    constructor(msg,data){
        super(msg)
        this.status = 401,
        this.data = data
        this.message = msg
    }
}


module.exports = UnauthorizedException