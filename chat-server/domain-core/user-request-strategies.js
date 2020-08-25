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
     */
    addUser(json) {
        throw new Error("Not implement");
    }

    /**
     * @param {Object} json
     */
    deleteUser(json) {
        throw new Error("Not implement");
    }
}