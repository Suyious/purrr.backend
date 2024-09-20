import express from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';
import cors from 'cors';
import { chatHandler } from './handlers/chat';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  },
  maxHttpBufferSize: 1e8
});

// Middleware
app.use(cors());
app.use(express.json());

// Socket.IO connection handling
io.on('connection', chatHandler);

// Basic route
app.get('/', (req, res) => {
  res.send('This is the chat server for Purr.chat');
});

const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 3007;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));