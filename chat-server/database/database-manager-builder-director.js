import {Repositories} from "./repositories";
import {DatabaseManager} from "./database-manager";
import {DatabaseManagerBuilder} from "./database-manager-builder";

export class DatabaseManagerBuilderDirector {
    constructor() {
        /** @type {DatabaseManagerBuilder} */
        this.builder = new DatabaseManagerBuilder();
    }

    /**
     * @return {DatabaseManager}
     */
    createDatabaseManager() {
        /** @type {Client} */
        let connection = this.builder.createConnection();
        /** @type {Repositories} */
        const repositories = this.builder.createRepositories(connection);
        return this.builder.buildDatabaseManager(connection, repositories);
    }
}