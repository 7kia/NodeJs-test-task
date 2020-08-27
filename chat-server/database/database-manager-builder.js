import {MyConnection} from "./myConnection";
import {Repositories} from "./repositories";
import {UserRepository} from "./repositories/user-repository";
import {ChatRepository} from "./repositories/chat-repository";
import {MessageRepository} from "./repositories/message-repository";
import {DatabaseManager} from "./database-manager";

export class DatabaseManagerBuilder {
    /**
     * @return {Client}
     */
    createConnection() {
        return MyConnection.create();
    }

    /**
     * @param {Client} connection
     * @return {Repositories}
     */
    createRepositories(connection) {
        /** @type {Repositories} */
        const repositories = new Repositories();
        repositories.userRepository = new UserRepository(connection);
        repositories.chatRepository = new ChatRepository(connection);
        repositories.messageRepository = new MessageRepository(connection);
        return repositories
    }

    /**
     * @param {Client} connection
     * @param {Repositories} repositories
     * @return {DatabaseManager}
     */
    buildDatabaseManager(connection, repositories) {
        return new DatabaseManager(connection, repositories);
    }
}