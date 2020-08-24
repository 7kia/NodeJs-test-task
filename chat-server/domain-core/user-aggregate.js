export class UserAggregate {
    /**
     *
     * @param {UserRepository} userDatabaseManager
     */
    constructor(userDatabaseManager) {
        /** @private {UserRepository} */
        this.userDatabaseManager = userDatabaseManager;
    }

    /**
     * @param {Object} json
     */
    checkInputData(json) {
        throw new Error("Not implement");
    }

    /**
     * @param {Object} json
     */
    addUser(json) {
        throw new Error("Not implement");
    }

}