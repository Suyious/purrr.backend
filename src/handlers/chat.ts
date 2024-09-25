import { Socket } from "socket.io";
import { User } from "../types/user";
import { chatService } from "../services/chat";
import { ClientEvents, ClientToServerEvents, ServerEvents, ServerToClientEvents } from "../types/events";

export function chatHandler(socket: Socket<ClientToServerEvents, ServerToClientEvents>) {
    console.log('New client connected:', socket.id);

    const user: User = { id: socket.id, socket, name: null, partner: null };
    chatService.addUser(user);

    socket.on(ClientEvents.INIT_USER, ({ name }) => {
        chatService.setUserName(socket.id, name);
        console.log("Client", socket.id, "named themselves", chatService.getUser(socket.id)?.name);
    })

    socket.on(ClientEvents.FIND_PARTNER, () => {
        chatService.addToWaitingList(socket.id);
        console.log(chatService.getUser(socket.id)?.name, "is waiting to chat");
        socket.emit(ServerEvents.WAITING);

        const match = chatService.matchUsers();

        if (match) {
            const [user1Id, user2Id] = match;
            console.log(chatService.getUserName(user1Id), "is matched with", chatService.getUserName(user2Id));

            const user1Socket = chatService.getUserSocket(user1Id);
            const user2Socket = chatService.getUserSocket(user2Id);
            if(user1Socket && user2Socket) {
                user1Socket.emit(ServerEvents.MATCHED, { partnerName: chatService.getUserName(user2Id) });
                user2Socket.emit(ServerEvents.MATCHED, { partnerName: chatService.getUserName(user1Id) });
            }
        }
    });

    socket.on(ClientEvents.SEND_MESSAGE, ({ message, image, reply }) => {
        const partnerId = chatService.getPartnerId(socket.id);
        if (partnerId) {
          socket.to(partnerId).emit(ServerEvents.RECEIVE_MESSAGE, {
            from: chatService.getUserName(socket.id) || "",
            body: message,
            image,
            reply,
          });
        } else {
          socket.emit(ServerEvents.ERROR, { message: 'No partner found.' });
        }
    });

    socket.on(ClientEvents.READ_MESSAGE, ({ messageId }) => {
        const partnerId = chatService.getPartnerId(socket.id);
        if (partnerId) {
          socket.to(partnerId).emit(ServerEvents.MARK_AS_READ, {
            messageId
          });
        } else {
          socket.emit(ServerEvents.ERROR, { message: 'No partner found.' });
        }
    });

    socket.on(ClientEvents.TYPING_START, () => {
      const partnerId = chatService.getPartnerId(socket.id);
      if (partnerId) {
        socket.to(partnerId).emit(ServerEvents.SHOW_TYPING);
      } else {
        socket.emit(ServerEvents.ERROR, { message: 'No partner found.' });
      }
    });

    socket.on(ClientEvents.TYPING_STOP, () => {
      const partnerId = chatService.getPartnerId(socket.id);
      if (partnerId) {
        socket.to(partnerId).emit(ServerEvents.HIDE_TYPING);
      } else {
        socket.emit(ServerEvents.ERROR, { message: 'No partner found.' });
      }
    });

    socket.on(ClientEvents.DISCONNECT_PARTNER, () => {
        const partnerId = chatService.disconnectPartner(socket.id);
        if (partnerId) {
            socket.to(partnerId).emit(ServerEvents.PARTNER_DISCONNECTED);
            socket.emit(ServerEvents.PARTNER_DISCONNECTED);
        }
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected: ', socket.id);
        const partnerId = chatService.disconnectPartner(socket.id);
        if (partnerId) {
            socket.to(partnerId).emit(ServerEvents.PARTNER_DISCONNECTED);
        }
        chatService.removeUser(socket.id);
    });
}
