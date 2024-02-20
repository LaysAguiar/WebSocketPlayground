const WebSocket = require('ws');
const http = require('http');

const server = http.createServer();
const wss = new WebSocket.Server({ noServer: true });

wss.on('connection', (ws) => {
     console.log('Cliente conectado');

     ws.on('message', (message) => {
          console.log(`Mensagem recebida: ${message}`);
          ws.send('Mensagem do servidor: Recebida!');
     });

     ws.on('close', () => {
          console.log('Cliente desconectado');
     });
});

server.on('upgrade', (request, socket, head) => {
     wss.handleUpgrade(request, socket, head, (ws) => {
          wss.emit('connection', ws, request);
     });
});

const PORT = 3001;

server.listen(PORT, () => {
     console.log(`Servidor WebSocket está ouvindo na porta ${PORT}`);
});
