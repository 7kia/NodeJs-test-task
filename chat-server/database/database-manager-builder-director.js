import {Repositories} from "./repositories";
import {DatabaseManager} from "./database-manager";
import {DatabaseManagerBuilder} from "./database-manager-builder";
import {PromiseWrap} from "../helper-modules/promise-wrap";

export class DatabaseManagerBuilderDirector {
    constructor() {
        /** @type {DatabaseManagerBuilder} */
        this.builder = new DatabaseManagerBuilder();
    }

    /**
     * @param {boolean} isProductionMode
     * @return {Promise<DatabaseManager>}
     */
    async createDatabaseManager(isProductionMode = false) {
        /** @type {DatabaseManagerBuilderDirector} */
        let self = this;
        return await PromiseWrap.asyncWrap(async function() {
            /** @type {Client} */
            let connection = self.builder.createConnection(isProductionMode);
            /** @type {Repositories} */
            const repositories = self.builder.createRepositories(connection);
            await self.builder.createTablesIfNotExist(repositories);
            return self.builder.buildDatabaseManager(connection, repositories);
        }, true);
    }
}