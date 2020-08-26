import {Client} from "pg";


export class MyConnection {
    /** @private {Client} */
    static postgreConnection = null;

    /**
     *
     * @return {Client}
     */
    static create() {
        if (!MyConnection.postgreConnection) {
            MyConnection.postgreConnection = new Client({
                host: "localhost",
                port: 5432,
                database: "postgres",
                user: "postgres",
                password: "1",
            })
            MyConnection.postgreConnection.connect();
        }
        return MyConnection.postgreConnection;
    }
}