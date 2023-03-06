const {app} = require('./app')
//___________________________________________  LOGS  _________________________________________________ //
const {logger} = require('./utils/logger')
//___________________________________________  CONFIG  _________________________________________________ //
const config = require('./utils/config')

const http = require('http');
const httpServer = http.createServer(app);
const {createSocketIO} = require('./sockets')

createSocketIO(httpServer)

const server = httpServer.listen(config.PORT,()=>{
    logger.info(`✅ Listening on port ${config.PORT} || http://localhost:${config.PORT}/`)
})

server.on("error",err=>logger.error(err));

