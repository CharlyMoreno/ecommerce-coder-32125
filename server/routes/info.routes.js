const { Router } = require('express')
const infoRoutes = Router()
const numCPUs = require('os').cpus().length

const config = require('../utils/config')

infoRoutes.get('/', (req, res) => {
    const info = getInfo()
    console.log(info)
    res.render('info',{info:info})
})

function getInfo(){
    const info = {
        port: config.PORT,
        emailAdmin: config.EMAIL_ADMIN,
        args:process.argv.toString(),
        sistOperativo:process.platform,
        versionNode:process.version,
        memoriaTotal:process.memoryUsage().heapTotal,
        path:process.cwd(),
        processId:process.pid,
        carpetaProyecto:process.cwd(),
        numCPUs:numCPUs
    }
    return info;
}

module.exports = infoRoutes;