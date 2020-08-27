import {UserRepository} from "./repositories/user-repository";
import {MessageRepository} from "./repositories/message-repository";
import {ChatRepository} from "./repositories/chat-repository";

export class RepositoriesFactory {
    /**
     * @param {Client} connection
     * @return {UserRepository}
     */
    createUserRepository(connection) {
        return new UserRepository(connection);
    }

    /**
     * @param {Client} connection
     * @return {ChatRepository}
     */
    createChatRepository(connection) {
        return new ChatRepository(connection);
    }

    /**
     * @param {Client} connection
     * @return {MessageRepository}
     */
    createMessageRepository(connection) {
        return new MessageRepository(connection);
    }
}