import {Client} from "pg";


export class MyConnection {
    /** @private {Client} */
    static postgreConnection = null;

    /**
     * @param {boolean} isProductionMode
     * @return {Client}
     */
    static create(isProductionMode) {
        if (!MyConnection.postgreConnection) {
            MyConnection.postgreConnection = new Client({
                host: "localhost",
                port: 5432,
                database: isProductionMode ? "ChatServer" : "ChatServerTest",
                user: "postgres",
                password: "1",
            })
            MyConnection.postgreConnection.connect();
        }
        return MyConnection.postgreConnection;
    }
}