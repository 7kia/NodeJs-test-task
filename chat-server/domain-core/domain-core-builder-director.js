import {DomainCoreBuilder} from "./domain-core-builder";
import {DomainCore} from "./domain-core";

export class DomainCoreBuilderDirector {
    /**
     * @param {DatabaseManager} databaseManager
     */
    constructor(databaseManager) {
        /** @private {DatabaseManager} */
        this.databaseManager = databaseManager;
        /** @private {DomainCoreBuilder} */
        this.builder = new DomainCoreBuilder(this.databaseManager);
    }

    /**
     * @returns {DomainCore}
     */
    createDomainCore() {
        /** @type {UserRequestStrategies} */
        const userStrategies = this.builder.createUserStrategies();
        /** @type {ChatRequestStrategies} */
        const chatStrategies = this.builder.createChatStrategies();
        /** @type {Strategies} */
        const strategies = this.builder.createStrategies(userStrategies, chatStrategies);

        /** @type {UserRequestRules} */
        const userRules = this.builder.createUserRules();
        /** @type {ChatRequestRules} */
        const chatRules = this.builder.createChatRules();
        /** @type {Rules} */
        const rules = this.builder.createRules(userRules, chatRules);

        return this.builder.buildDomainCore(rules, strategies);
    }
}