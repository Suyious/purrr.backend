import { Socket } from "socket.io";

export interface User {
    id: string;
    name: string | null;
    gender: string | null,
    socket: Socket;
    partner: string | null;
}
