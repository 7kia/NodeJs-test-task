export class ChatAggregate {
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
}