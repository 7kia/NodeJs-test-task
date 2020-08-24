import {ChatServerBuilder} from "./chat-server-builder";

export class ChatServerBuilderDirector {
    constructor() {
        /** @private {ChatServerBuilder} */
        this.builder = new ChatServerBuilder();
        /** @private {DomainCore} */
        this.domainCore = this.builder.createDomainCore();
    }
    /**
     *
     * @returns {UserRouterController}
     */
    createUserRouterController() {
        return this.builder.createUserRouterController(this.domainCore.getUserAggregate());
    }

    /**
     *
     * @returns {ChatRouterController}
     */
    createChatRouterController() {
        return this.builder.createChatRouterController(this.domainCore.getChatAggregate());
    }
}