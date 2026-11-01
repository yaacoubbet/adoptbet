const express = require('express');
const http = require('http');
const WebSocket = require('server').Server; // Or standard 'ws' WebSocket.Server
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// WebSocket connection for live chat and coinflips
wss.on('connection', (ws) => {
    console.log('[WebSocket] A user connected');

    ws.on('message', (message) => {
        // Broadcast incoming chat or game actions to all connected users
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message.toString());
            }
        });
    });

    ws.on('close', () => {
        console.log('[WebSocket] User disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`[AdoptBet] Server running on port ${PORT}`);
});