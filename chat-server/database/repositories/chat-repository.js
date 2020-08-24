import {PromiseWrap} from "../../promise-wrap";
import {Chat} from "../entity/Chat";
import {Repository} from "./Repository";

export class ChatRepository extends Repository {
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
     * @return {Promise<Chat>}
     */
    async get(username) {
        return await PromiseWrap.asyncPromise(async function() {
            return new Chat({
                "id": null, "name": null, "users": null, "createdAt": null
            });
        }, true);
    }
}