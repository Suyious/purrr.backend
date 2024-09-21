import { Socket } from "socket.io";
import { User } from "../types/user";

class ChatService {
    private users: Map<string, User> = new Map();
    private waitingUsers: string[] = [];

    getUser(userId: string): User | undefined {
        return this.users.get(userId);
    }

    getUserName(userId: string): string | null | undefined {
        const user = this.users.get(userId);
        if(user) {
            return user.name;
        }
    }

    getUserGender(userId: string): string | null | undefined {
        const user = this.users.get(userId);
        if(user) {
            return user.gender;
        }
    }

    getUserSocket(userId: string): Socket | undefined {
        const user = this.users.get(userId);
        if(user) {
            return user.socket;
        }
    }

    setUserName(userId: string, name: string): void {
        const user = this.users.get(userId);

        if(user) {
            user.name = name;
            this.users.set(userId, user);
        }
    }

    setUserGender(userId: string, gender: string): void {
        const user = this.users.get(userId);

        if(user) {
            user.gender = gender;
            this.users.set(userId, user);
        }
    }

    getPartnerId(userId: string): string | null | undefined {
        return this.users.get(userId)?.partner;
    }

    addUser(user: User): void {
        this.users.set(user.id, user);
    }

    removeUser(userId: string): void {
        this.users.delete(userId);
        const index = this.waitingUsers.indexOf(userId);
        if (index > -1) {
            this.waitingUsers.splice(index, 1);
        }
    }

    addToWaitingList(userId: string): void {
        if (!this.users.get(userId)?.partner) {
            this.waitingUsers.push(userId);
        }
    }

    matchUsers(): [string, string] | null {
        if (this.waitingUsers.length < 2) return null;

        const user1Id = this.waitingUsers.shift()!;
        const user2Id = this.waitingUsers.shift()!;

        const user1 = this.users.get(user1Id)!;
        const user2 = this.users.get(user2Id)!;

        user1.partner = user2Id;
        user2.partner = user1Id;

        return [user1Id, user2Id];
    }

    disconnectPartner(userId: string): string | null {
        const user = this.users.get(userId);
        if (user?.partner) {
            const partner = this.users.get(user.partner);
            if (partner) {
                partner.partner = null;
            }
            const partnerId = user.partner;
            user.partner = null;
            return partnerId;
        }
        return null;
    }
}

export const chatService = new ChatService();
