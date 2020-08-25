import {UserRequestStrategies} from "./user-request-strategies";
import {ChatRequestStrategies} from "./chat-request-strategies";

export class DomainCore {
    /**
     *
     * @param {Rules} rules
     * @param {Strategies} strategies
     */
    constructor(rules, strategies) {
        /** @private {Rules} */
        this.rules = rules;
        /** @Strategies {Strategies} */
        this.strategies = strategies;
    }

    /**
     *
     * @returns {UserRequestStrategies}
     */
    getUserRequestStrategies() {
        return this.strategies.userRequestStrategies;
    }

    /**
     *
     * @returns {ChatRequestStrategies}
     */
    getChatRequestStrategies() {
        return this.strategies.chatRequestStrategies;
    }
    /**
     *
     * @returns {UserRequestRules}
     */
    getUserRequestRules() {
        return this.rules.userRequestRules;
    }

    /**
     *
     * @returns {ChatRequestRules}
     */
    getChatRequestRules() {
        return this.rules.chatRequestRules;
    }
}