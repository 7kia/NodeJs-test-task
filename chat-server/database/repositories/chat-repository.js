import {PromiseWrap} from "../../promise-wrap";
import {Chat} from "../entity/chat";
import {Repository} from "./Repository";

export class ChatRepository extends Repository {
    /**
     * @param {Client} connection
     */
    constructor(connection) {
        super(connection);
    }

    /**
     *
     * @param {string} name
     * @param {Array<number>} users
     * @return {Promise<number>}
     */
    async add(name, users) {
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
     * @param {Object} fields
     * @return {Promise<Chat>}
     */
    async find(fields) {
        return await PromiseWrap.asyncWrap(async function() {
            return new Chat({
                "id": null, "name": null, "users": null, "createdAt": null
            });
        }, true);
    }

    /**
     *
     * @param {number} userId
     * @return {Promise<Array<Chat>>}
     */
    async findAllForUser(userId) {
        return await PromiseWrap.asyncWrap(async function() {
            return [
                new Chat({
                    "id": null, "name": null, "users": null, "createdAt": null
                })
            ];
        }, true);
    }
}