import {UserAggregate} from "./user-aggregate";
import {ChatAggregate} from "./chat-aggregate";

export class DomainCore {
    /**
     *
     * @param {UserAggregate} userAggregate
     * @param {ChatAggregate} chatAggregate

     */
    constructor(userAggregate, chatAggregate) {
        /** @private {UserAggregate} */
        this.userAggregate = userAggregate;
        /** @private {ChatAggregate} */
        this.chatAggregate = chatAggregate;
    }
    /**
     *
     * @returns {UserAggregate}
     */
    getUserAggregate() {
        return this.userAggregate;
    }
    /**
     *
     * @returns {ChatAggregate}
     */
    getChatAggregate() {
        return this.chatAggregate;
    }
}