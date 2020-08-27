import {PromiseWrap} from "../helper-modules/promise-wrap";

export class UserRequestStrategies {
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
     * @return {Promise<number>}
     */
    async addUser(json) {
        let self = this;
        return await PromiseWrap.asyncWrap(async function() {
            /** @type {string} */
            const username = json["username"];
            return await self.userRepository.add(username);
        }, true);
    }

    /**
     * @param {Object} json
     * @return {Promise}
     */
    async deleteUser(json) {
        let self = this;
        return await PromiseWrap.asyncWrap(async function() {
            /** @type {string} */
            const username = json["username"];
            return await self.userRepository.delete(username);
        }, true);
    }
}