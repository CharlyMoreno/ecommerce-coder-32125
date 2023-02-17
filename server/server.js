const {app} = require('./app')
//___________________________________________  LOGS  _________________________________________________ //
const {logger} = require('./utils/logger')
//___________________________________________  CONFIG  _________________________________________________ //
const config = require('./utils/config')

const server = app.listen(config.PORT,()=>{
    logger.info(`✅ Listening on port ${config.PORT} || http://localhost:8080/`)
})

server.on("error",err=>logger.error(err));