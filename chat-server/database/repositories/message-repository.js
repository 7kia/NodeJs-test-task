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
     * @param {string} username
     * @return {Promise<number>}
     */
    async add(username) {
        return await PromiseWrap.asyncPromise(async function() {
            return -1;
        }, true);
    }
    /**
     *
     * @param {string} username
     * @return {Promise<boolean>}
     */
    async delete(username) {
        return await PromiseWrap.asyncPromise(async function() {
            return false;
        }, true);
    }

    /**
     *
     * @param {string} username
     * @return {Promise<ChatMessage>}
     */
    async get(username) {
        return await PromiseWrap.asyncPromise(async function() {
            return new ChatMessage({
                "id": null, "chat": null, "author": null,
                "text": null, "createdAt": null
            });
        }, true);
    }
}