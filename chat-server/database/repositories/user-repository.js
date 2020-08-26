import {User} from "../entity/user";
import {PromiseWrap} from "../../promise-wrap";
import {Repository} from "./Repository";

export class UserRepository extends Repository {
    /**
     * @param {Client} connection
     */
    constructor(connection) {
        super(connection);
    }

    /**
     *
     * @param {string} username
     * @return {Promise<number>}
     */
    async add(username) {
        return await PromiseWrap.asyncWrap(async function() {
            return -1;
        }, true);
    }
    /**
     *
     * @param {string} username
     * @return {Promise<boolean>}
     */
    async delete(username) {
        return await PromiseWrap.asyncWrap(async function() {
            return false;
        }, true);
    }

    /**
     *
     * @param {Object} searchParameters
     * @return {Promise<User|null>}
     */
    async find(searchParameters) {
        return await PromiseWrap.asyncWrap(async function() {
            return new User({
                "id": null, "username": null, "createdAt": null
            });
        }, true);
    }
}