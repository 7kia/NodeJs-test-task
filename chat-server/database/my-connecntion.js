import {Client} from "pg";


export class MyConnecntion {
    /** @private {Client} */
    static postgreConnection = null;

    /**
     *
     * @return {Client}
     */
    static create() {
        if (!MyConnecntion.postgreConnection) {
            MyConnecntion.postgreConnection = new Client({
                host: "localhost",
                port: 5432,
                database: "ChatServer",
                user: "postgres",
                password: "1",
            })
            MyConnecntion.postgreConnection.connect();
        }
        return MyConnecntion.postgreConnection;
    }
}