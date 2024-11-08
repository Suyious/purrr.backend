import express from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';
import cors from 'cors';
import { chatHandler } from './handlers/chat';
import { webRTCHandler } from './handlers/webrtc';

const app = express();
const server = http.createServer(app);

const ALLOWED_ORIGINS = process.env.HOST_URL ? process.env.HOST_URL.split(" ") : [];

const io = new Server(server, {
  cors: {
    origin: [...ALLOWED_ORIGINS, "http://localhost:3000"],
    methods: ["GET", "POST"]
  },
  maxHttpBufferSize: 1e8
});

// Middleware
app.use(cors());
app.use(express.json());

// Socket.IO Chat connection handling
io.on('connection', chatHandler);

// Socket.IO WebRTC connection handling
io.on('connection', webRTCHandler);

// Basic route
app.get('/', (req, res) => {
  res.send('This is the chat server for Purr.chat');
});

const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 3007;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
