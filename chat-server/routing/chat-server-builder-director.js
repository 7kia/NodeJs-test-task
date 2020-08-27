import {ChatServerBuilder} from "./chat-server-builder";

export class ChatServerBuilderDirector {
    /**
     * @param {DatabaseManager} databaseManager
     */
    constructor(databaseManager) {
        /** @private {ChatServerBuilder} */
        this.builder = new ChatServerBuilder(databaseManager);
        /** @private {DomainCore} */
        this.domainCore = this.builder.createDomainCore();
    }
    /**
     *
     * @returns {UserRouterController}
     */
    createUserRouterController() {
        return this.builder.createUserRouterController(
            this.domainCore.getUserRequestRules(),
            this.domainCore.getUserRequestStrategies()
        );
    }

    /**
     *
     * @returns {ChatRouterController}
     */
    createChatRouterController() {
        return this.builder.createChatRouterController(
            this.domainCore.getChatRequestRules(),
            this.domainCore.getChatRequestStrategies()
        );
    }
}