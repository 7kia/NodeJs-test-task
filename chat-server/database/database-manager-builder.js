import {MyConnection} from "./my-connection";
import {Repositories} from "./repositories";
import {DatabaseManager} from "./database-manager";
import {RepositoriesFactory} from "./repositories-factory";
import {PromiseWrap} from "../helper-modules/promise-wrap";

export class DatabaseManagerBuilder {
    constructor() {
        /** @private {RepositoriesFactory} */
        this.repositoriesFactory = new RepositoriesFactory();
    }

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
        repositories.userRepository = this.repositoriesFactory.createUserRepository(connection);
        repositories.chatRepository = this.repositoriesFactory.createChatRepository(connection);
        repositories.messageRepository = this.repositoriesFactory.createMessageRepository(connection);
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

    /**
     * @param {Repositories} repositories
     */
    async createTablesIfNotExist(repositories) {
        return await PromiseWrap.asyncWrap(async function() {
            await repositories.userRepository.createTableIfNotExist();
            await repositories.chatRepository.createTableIfNotExist();
            await repositories.messageRepository.createTableIfNotExist();
        }, true);
    }
}