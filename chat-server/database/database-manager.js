import {UserRepository} from "./repositories/user-repository";
import {ChatRepository} from "./repositories/chat-repository";
import {Client} from "pg";
import {MessageRepository} from "./repositories/message-repository";

export class DatabaseManager {
    constructor() {
        /** @private {Client} */
        this.connection = new Client({
            host: "localhost",
            port: 5432,
            database: "ChatServer",
            user: "postgres",
            password: "postgres",
        })
        this.connection.connect();
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