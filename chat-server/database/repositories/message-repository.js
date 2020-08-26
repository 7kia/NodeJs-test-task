import {PromiseWrap} from "../../promise-wrap";
import {ChatMessage} from "../entity/chat-message";
import {Repository} from "./Repository";

export class MessageRepository extends Repository {
    /**
     * @param {Client} connection
     */
    constructor(connection) {
        super();
        this.connection = connection;
    }

    /**
     *
     * @return {Promise<number>}
     * @param {number} chatId
     * @param {number} author
     * @param {string} text
     */
    async add(chatId, author, text) {
        return await PromiseWrap.asyncWrap(async function() {
            return -1;
        }, true);
    }
    /**
     *
     * @param {number} id
     * @return {Promise<boolean>}
     */
    async delete(id) {
        return await PromiseWrap.asyncWrap(async function() {
            return false;
        }, true);
    }
    /**
     *
     * @param {number} chatId
     * @return {Promise<Array<ChatMessage>>}
     */
    async getMessages(chatId) {
        return await PromiseWrap.asyncWrap(async function() {
            return [
                new ChatMessage({
                    "id": null, "chat": null, "author": null,
                    "text": null, "createdAt": null
                })
            ];
        }, true);
    }
}