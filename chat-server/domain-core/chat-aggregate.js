export class ChatAggregate {
    /**
     *
     * @param {IChatDatabaseManager} chatDatabaseManager
     */
    constructor(chatDatabaseManager) {
        /** @private {IChatDatabaseManager} */
        this.chatDatabaseManager = chatDatabaseManager;
    }
}