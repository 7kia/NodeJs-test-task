import {UserAggregate} from "./user-aggregate";
import {ChatAggregate} from "./chat-aggregate";
import {DomainCore} from "./domain-core";

export class DomainCoreBuilder {
    /**
     *
     * @param {DatabaseManager} databaseManager
     */
    constructor(databaseManager) {
        this.databaseManager = databaseManager;
    }
    /**
     * @return {UserAggregate}
     */
    createUserAggregate() {
        return new UserAggregate(this.databaseManager.getUserDatabaseManager());
    }
    /**
     * @return {ChatAggregate}
     */
    createChatAggregate() {
        return new ChatAggregate(this.databaseManager.getChatDatabaseManager());
    }
    /**
     *
     * @param {UserAggregate} userAggregate
     * @param {ChatAggregate} chatAggregate
     * @return {DomainCore}
     */
    buildDomainCore(userAggregate, chatAggregate) {
        return new DomainCore(userAggregate, chatAggregate);
    }
}