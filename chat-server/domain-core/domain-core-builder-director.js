import {DomainCoreBuilder} from "./domain-core-builder";
import {DomainCore} from "./domain-core";

export class DomainCoreBuilderDirector {
    /**
     *
     * @param {DatabaseManager} databaseManager
     */
    constructor(databaseManager) {
        /** @private {DatabaseManager} */
        this.databaseManager = databaseManager;
        /** @private {DomainCoreBuilder} */
        this.builder = new DomainCoreBuilder(this.databaseManager);
    }
    /**
     *
     * @returns {DomainCore}
     */
    createDomainCore() {
        /** @type {UserAggregate} */
        const userAggregate = this.builder.createUserAggregate();
        /** @type {ChatAggregate} */
        const chatAggregate = this.builder.createChatAggregate();
        return this.builder.buildDomainCore(userAggregate, chatAggregate);
    }
}