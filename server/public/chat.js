const socket = io();

const textoInput = document.getElementById('texto')
const botonEnviar = document.getElementById('enviarMensaje')
const mensajeBox = document.getElementsByClassName('mensajes_box')[0]

botonEnviar.onclick = () => {
    const mensaje = {
        texto: textoInput.value
    }
    socket.emit('new-message',mensaje)
}

function cargarMensajes(mensajes) {
    let html = ''
    mensajes.forEach(mensaje => {
        html += `
            <div class="mensaje">
                <p class="usuario">${mensaje.user.username} - ${mensaje.timestamp}</p>
                <p class="texto">${mensaje.texto}</p>
            </div>`
    });
    mensajeBox.innerHTML = html
}


socket.on('dataMessages', (data) => {
    cargarMensajes(data[0])
})