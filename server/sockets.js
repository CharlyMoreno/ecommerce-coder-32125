const { Server } = require('socket.io')
const MensajesServices = require('./services/mensajes.services')

const {decodedToken} = require('./middleware/views.auth.middleware')

const createSocketIO = (server) => {
  const io = new Server(server);

    //server side
  // io.use((socket, next) => {
  //   const token = socket;
  //   console.log(token)
  // });

  io.on('connection',(socket)=>{
    let token = ''

    const cookieToken = socket.handshake.headers.cookie

    if (cookieToken.toLowerCase().startsWith('access_token=')) {
      token = cookieToken.substring(13)
    }

    console.log('Nuevo usuario conectado')
  
    socket.on('new-message',async data => {
        const idUser = decodedToken(token).idUser
        await MensajesServices.guardarMensaje(data,idUser)
        const mensajes = await MensajesServices.getAllMensajes()
        io.sockets.emit('dataMessages', [mensajes]);
    });
  
  });

};

module.exports = {createSocketIO};

