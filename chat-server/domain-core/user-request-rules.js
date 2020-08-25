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
     */
    checkNewUserData(json) {
        throw new Error("Not implement");
    }

    /**
     * @param {Object} json
     */
    checkDeleteUserData(json) {
        throw new Error("Not implement");
    }
}