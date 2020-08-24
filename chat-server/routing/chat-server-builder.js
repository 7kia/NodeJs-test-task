import {DomainCoreBuilderDirector} from "../domain-core/domain-core-builder-director";
import {DatabaseManager} from "../database/database-manager";
import {UserRouterController} from "./user-router-controller";
import {ChatRouterController} from "./chat-router-controller";

export class ChatServerBuilder {
    constructor() {
        /** @private {DatabaseManager} */
        this.databaseManager = new DatabaseManager();
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
     * @param {UserAggregate} userAggregate
     * @return {UserRouterController}
     */
    createUserRouterController(userAggregate) {
        return new UserRouterController(userAggregate);
    }

    /**
     * @param {ChatAggregate} chatAggregate
     * @return {ChatRouterController}
     */
    createChatRouterController(chatAggregate) {
        return new ChatRouterController(chatAggregate);
    }
}