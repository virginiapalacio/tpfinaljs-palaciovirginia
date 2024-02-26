const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Configurar el servidor HTTP para servir archivos estáticos (como HTML, CSS, JavaScript, etc.)
app.use(express.static(__dirname + '/public'));

// Manejar conexiones de Socket.io
io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');

    // Manejar el evento 'formularioEnviado' recibido desde el cliente
    socket.on('formularioEnviado', (data) => {
        console.log('Datos del formulario recibidos:', data);

        // Aquí puedes realizar cualquier acción que desees con los datos recibidos del formulario
    });

    // Manejar la desconexión de un cliente
    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor Socket.io escuchando en el puerto ${PORT}`);
});
