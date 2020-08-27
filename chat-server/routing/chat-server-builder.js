import {DomainCoreBuilderDirector} from "../domain-core/domain-core-builder-director";
import {UserRouterController} from "./user-router-controller";
import {ChatRouterController} from "./chat-router-controller";
import {DatabaseManagerBuilderDirector} from "../database/database-manager-builder-director";

export class ChatServerBuilder {
    constructor() {
        /** @private {DatabaseManager} */
        this.databaseManager = new DatabaseManagerBuilderDirector().createDatabaseManager();
        /** @private {DomainCoreBuilderDirector} */
        this.domainCoreBuiderDirector = new DomainCoreBuilderDirector(this.databaseManager);
    }
    /**
     * @return {DomainCore}
     */
    createDomainCore() {
        return this.domainCoreBuiderDirector.createDomainCore();
    }

    /**
     * @param {UserRequestRules} rules
     * @param {UserRequestStrategies} strategies
     * @return {UserRouterController}
     */
    createUserRouterController(rules, strategies) {
        return new UserRouterController(rules, strategies);
    }

    /**
     * @param {ChatRequestRules} rules
     * @param {ChatRequestStrategies} strategies
     * @return {ChatRouterController}
     */
    createChatRouterController(rules, strategies) {
        return new ChatRouterController(rules, strategies);
    }
}