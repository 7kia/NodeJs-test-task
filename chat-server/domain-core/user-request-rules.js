import {PromiseWrap} from "../promise-wrap";
import {User} from "../database/entity/user";

export class UserRequestRules {
    /**
     *
     * @param {UserRepository} userDatabaseManager
     */
    constructor(userDatabaseManager) {
        /** @private {UserRepository} */
        this.userRepository = userDatabaseManager;
    }

    /**
     * @param {Object} json
     * @return {Promise<boolean>}
     */
    async canAddUser(json) {
        let self = this;
        return await PromiseWrap.asyncWrap(async function() {
            /** @type {string} */
            const username = json["username"];
            if (await UserRequestRules.existUser({"username": username}, self.userRepository)) {
                throw new Error("User with name \"${username}\" exist");
            }
            return true;
        }, true);
    }

    /**
     * @param {Object} json
     * @return {Promise<boolean>}
     */
    async canDeleteUser(json) {
        let self = this;
        return await PromiseWrap.asyncWrap(async function() {
            /** @type {string} */
            const username = json["username"];
            if (!await UserRequestRules.existUser({"username": username}, self.userRepository)) {
                throw new Error("User with name \"${username}\" not exist");
            }
            return true;
        }, true);
    }

    /**
     * @param {Object} fields
     * @param {UserRepository} userRepository
     * @return {Promise<boolean>}
     */
    static async existUser(fields, userRepository) {
        return await PromiseWrap.asyncWrap(async function() {
            /** @type {User} */
            const user = await userRepository.find({"username": username});
            return user !== null;
        }, true);
    }
}