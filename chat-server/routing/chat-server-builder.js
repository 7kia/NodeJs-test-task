import {DomainCoreBuilderDirector} from "../domain-core/domain-core-builder-director";
import {UserRouterController} from "./user-router-controller";
import {ChatRouterController} from "./chat-router-controller";

export class ChatServerBuilder {
    /**
     * @param {DatabaseManager} databaseManager
     */
    constructor(databaseManager) {
        /** @private {DatabaseManager} */
        this.databaseManager = databaseManager;
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