export class ChatRequestRules {
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
    checkNewChatData(json) {
        throw new Error("Not implement");
    }

    /**
     * @param {Object} json
     */
    checkDeleteChatData(json) {
        throw new Error("Not implement");
    }

    /**
     * @param {Object} json
     */
    checkNewMessageData(json) {
        throw new Error("Not implement");
    }

    /**
     * @param {Object} json
     */
    checkDeleteMessageData(json) {
        throw new Error("Not implement");
    }

    /**
     * @param {Object} json
     */
    checkGetListForUserRequestData(json) {
        throw new Error("Not implement");
    }

    /**
     * @param {Object} json
     */
    checkGetMessagesFromChatRequestData(json) {
        throw new Error("Not implement");
    }
}