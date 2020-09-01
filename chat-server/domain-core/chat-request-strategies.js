import {PromiseWrap} from "../helper-modules/promise-wrap";

export class ChatRequestStrategies {
    /**
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
     * @return {Promise<number>}
     */
    async addChat(json) {
        let self = this;
        return await PromiseWrap.asyncWrap(async function() {
            /** @type {string} */
            const name = json["name"];
            /** @type {Array<number>} */
            const users = json["users"];
            return await self.chatRepository.add(name, users);
        }, true);
    }

    /**
     * @param {Object} json
     * @return {Promise<boolean>}
     */
    async deleteChat(json) {
        let self = this;
        return await PromiseWrap.asyncWrap(async function() {
            /** @type {number} */
            const id = json["id"];
            return await self.chatRepository.delete(id);
        }, true);
    }

    /**
     * @param {Object} json
     * @return {Promise<number>}
     */
    async addMessage(json) {
        let self = this;
        return await PromiseWrap.asyncWrap(async function() {
            /** @type {number} */
            const chatId = json["chat"];
            /** @type {number} */
            const author = json["author"];
            /** @type {string} */
            const text = json["text"];
            return await self.messageRepository.add(chatId, author, text);
        }, true);
    }

    /**
     * @param {Object} json
     * @return {Promise<boolean>}
     */
    async deleteMessage(json) {
        let self = this;
        return await PromiseWrap.asyncWrap(async function() {
            /** @type {number} */
            const id = json["id"];
            return await self.messageRepository.delete(id);
        }, true);
    }

    /**
     * @param {Object} json
     * @return {Promise<Array<Chat>>}
     */
    async getListForUser(json) {
        let self = this;
        return await PromiseWrap.asyncWrap(async function() {
            /** @type {number} */
            const userId = json["user"];
            return await self.chatRepository.findAllForUser(userId);
        }, true);
    }

    /**
     * @param {Object} json
     * @return {Promise<Array<ChatMessage>>}
     */
    async getMessagesFromChat(json) {
        let self = this;
        return await PromiseWrap.asyncWrap(async function() {
            /** @type {number} */
            const chatId = json["chat"];
            return await self.messageRepository.getMessages(chatId);
        }, true);
    }
}