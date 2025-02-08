const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('Ein Benutzer ist verbunden');

    // Nachrichten empfangen und an alle Clients senden
    socket.on('text-update', (data) => {
        socket.broadcast.emit('text-update', data);
    });

    socket.on('disconnect', () => {
        console.log('Ein Benutzer hat die Verbindung getrennt');
    });
});

http.listen(3000, () => {
    console.log('Server läuft auf http://localhost:3000');
});
