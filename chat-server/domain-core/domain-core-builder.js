import {UserRequestStrategies} from "./user-request-strategies";
import {ChatRequestStrategies} from "./chat-request-strategies";
import {DomainCore} from "./domain-core";
import {UserRequestRules} from "./user-request-rules";
import {ChatRequestRules} from "./chat-request-rules";
import {Strategies} from "./strategies";
import {Rules} from "./rules";

export class DomainCoreBuilder {
    /**
     *
     * @param {DatabaseManager} databaseManager
     */
    constructor(databaseManager) {
        this.databaseManager = databaseManager;
    }

    /**
     * @return {UserRequestRules}
     */
    createUserRules() {
        return new UserRequestRules(this.databaseManager.getUserRepository());
    }

    /**
     * @return {ChatRequestRules}
     */
    createChatRules() {
        return new ChatRequestRules(
            this.databaseManager.getChatRepository(),
            this.databaseManager.getMessageRepository()
        );
    }


    /**
     * @param {UserRequestRules} userRules
     * @param {ChatRequestRules} chatRules
     * @return {Rules}
     */
    createRules(userRules, chatRules) {
        return new Rules(userRules, chatRules);
    }

    /**
     * @return {UserRequestStrategies}
     */
    createUserStrategies() {
        return new UserRequestStrategies(this.databaseManager.getUserRepository());
    }

    /**
     * @return {ChatRequestStrategies}
     */
    createChatStrategies() {
        return new ChatRequestStrategies(
            this.databaseManager.getChatRepository(),
            this.databaseManager.getMessageRepository()
        );
    }

    /**
     * @param {UserRequestStrategies} userStrategies
     * @param {ChatRequestStrategies} chatStrategies
     * @return {Strategies}
     */
    createStrategies(userStrategies, chatStrategies) {
        return new Strategies(userStrategies, chatStrategies);
    }

    /**
     *
     * @param {Rules} rules
     * @param {Strategies} strategies
     * @return {DomainCore}
     */
    buildDomainCore(rules, strategies) {
        return new DomainCore(rules, strategies);
    }
}