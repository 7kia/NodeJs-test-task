import {UserDatabaseManager} from "./user-database-manager";
import {ChatDatabaseManager} from "./chat-database-manager";

export class DatabaseManager {
    constructor() {
        /** @private {IUserDatabaseManager} */
        this.userDatabaseManager = new UserDatabaseManager();
        /** @private {IChatDatabaseManager} */
        this.chatDatabaseManager = new ChatDatabaseManager();
    }
    /**
     * @return {IUserDatabaseManager}
     */
    getUserDatabaseManager() {
        return this.userDatabaseManager;
    }
    /**
     * @return {IChatDatabaseManager}
     */
    getChatDatabaseManager() {
        return this.chatDatabaseManager;
    }
}