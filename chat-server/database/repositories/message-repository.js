import {PromiseWrap} from "../../promise-wrap";
import {Message} from "../entity/Message";
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
     * @return {Promise<Message>}
     */
    async get(username) {
        return await PromiseWrap.asyncPromise(async function() {
            return new Message({
                "id": null, "chat": null, "author": null,
                "text": null, "createdAt": null
            });
        }, true);
    }
}