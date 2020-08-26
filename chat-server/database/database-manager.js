import {UserRepository} from "./repositories/user-repository";
import {ChatRepository} from "./repositories/chat-repository";
import {MessageRepository} from "./repositories/message-repository";
import {MyConnection} from "./myConnection";

export class DatabaseManager {
    constructor() {
        /** @private {Client} */
        this.connection = MyConnection.create();
        /** @private {UserRepository} */
        this.userRepository = new UserRepository(this.connection);
        /** @private {ChatRepository} */
        this.chatRepository = new ChatRepository(this.connection);
        /** @private {MessageRepository} */
        this.messageRepository = new MessageRepository(this.connection);
    }
    /**
     * @return {UserRepository}
     */
    getUserRepository() {
        return this.userRepository;
    }

    /**
     * @return {ChatRepository}
     */
    getChatRepository() {
        return this.chatRepository;
    }

    /**
     * @return {MessageRepository}
     */
    getMessageRepository() {
        return this.messageRepository;
    }
}