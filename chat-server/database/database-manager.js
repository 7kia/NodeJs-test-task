import {UserRepository} from "./repositories/user-repository";
import {ChatRepository} from "./repositories/chat-repository";
import {MessageRepository} from "./repositories/message-repository";

export class DatabaseManager {
    /**
     * @param {Client} connection
     * @param {Repositories} repositories
     */
    constructor(connection, repositories) {
        /** @private {Repositories} */
        this.repositories = repositories;
    }

    /**
     * @return {UserRepository}
     */
    getUserRepository() {
        return this.repositories.userRepository;
    }

    /**
     * @return {ChatRepository}
     */
    getChatRepository() {
        return this.repositories.chatRepository;
    }

    /**
     * @return {MessageRepository}
     */
    getMessageRepository() {
        return this.repositories.messageRepository;
    }
}