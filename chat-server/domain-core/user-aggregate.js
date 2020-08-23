export class UserAggregate {
    /**
     *
     * @param {IUserDatabaseManager} userDatabaseManager
     */
    constructor(userDatabaseManager) {
        /** @private {IUserDatabaseManager} */
        this.userDatabaseManager = userDatabaseManager;
    }
}