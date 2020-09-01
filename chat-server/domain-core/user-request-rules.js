import {PromiseWrap} from "../helper-modules/promise-wrap";
import {User} from "../database/entity/user";
import {ErrorMessageGenerator} from "../helper-modules/error-message-generator";

export class UserRequestRules {
    /**
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
                throw new Error(ErrorMessageGenerator.generateUserExist(username));
            }
            return true;
        }, true, true);
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
                throw new Error(ErrorMessageGenerator.generateUserNotExist({"username": username}));
            }
            return true;
        }, true, true);
    }

    /**
     * @param {Object} fields
     * @param {UserRepository} userRepository
     * @return {Promise<boolean>}
     */
    static async existUser(fields, userRepository) {
        return await PromiseWrap.asyncWrap(async function() {
            /** @type {User} */
            const user = await userRepository.find(fields);
            return user !== null;
        }, true, true);
    }
}