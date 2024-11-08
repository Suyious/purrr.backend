import { Socket } from "socket.io";
import { ClientEvents, ClientToServerEvents, ServerEvents, ServerToClientEvents } from "../types/events";
import { chatService } from "../services/chat";

export function webRTCHandler(socket: Socket<ClientToServerEvents, ServerToClientEvents>) {
    socket.on(ClientEvents.REQUEST_VIDEO_CALL, () => {
        const partnerId = chatService.getPartnerId(socket.id);
        if (partnerId) {
            console.log(chatService.getUser(socket.id)?.name, "requested a video call");
            socket.to(partnerId).emit(ServerEvents.INCOMING_CALL);
        } else {
            socket.emit(ServerEvents.ERROR, { message: 'No partner found.' });
        }
    })

    socket.on(ClientEvents.SEND_OFFER, (offer) => {
        const partnerId = chatService.getPartnerId(socket.id);
        if (partnerId) {
            socket.to(partnerId).emit(ServerEvents.SET_OFFER, offer);
        } else {
            socket.emit(ServerEvents.ERROR, { message: 'No partner found.' });
        }
    });

    socket.on(ClientEvents.SEND_ANSWER, (answer) => {
        const partnerId = chatService.getPartnerId(socket.id);
        if (partnerId) {
            socket.to(partnerId).emit(ServerEvents.SET_ANSWER, answer);
        } else {
            socket.emit(ServerEvents.ERROR, { message: 'No partner found.' });
        }
    });

    socket.on(ClientEvents.SEND_CANDIDATE, (candidate) => {
        const partnerId = chatService.getPartnerId(socket.id);
        if (partnerId) {
            socket.to(partnerId).emit(ServerEvents.SET_CANDIDATE, candidate);
        } else {
            socket.emit(ServerEvents.ERROR, { message: 'No partner found.' });
        }
    });
}
