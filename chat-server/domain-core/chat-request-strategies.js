export class ChatRequestStrategies {
    /**
     *
     * @param {ChatRepository} chatRepository
     * @param {MessageRepository} messageRepository
     */
    constructor(chatRepository, messageRepository) {
        /** @private {ChatRepository} */
        this.chatRepository = chatRepository;
        /** @private {MessageRepository} */
        this.messageRepository = messageRepository;
    }

    /**
     * @param {Object} json
     */
    addChat(json) {
        throw new Error("Not implement");
    }

    /**
     * @param {Object} json
     */
    deleteChat(json) {
        throw new Error("Not implement");
    }

    /**
     * @param {Object} json
     */
    addMessage(json) {
        throw new Error("Not implement");
    }

    /**
     * @param {Object} json
     */
    deleteMessage(json) {
        throw new Error("Not implement");
    }

    /**
     * @param {Object} json
     */
    getListForUser(json) {
        throw new Error("Not implement");
    }

    /**
     * @param {Object} json
     */
    getMessagesFromChat(json) {
        throw new Error("Not implement");
    }
}