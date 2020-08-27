import {User} from "../entity/user";
import {PromiseWrap} from "../../helper-modules/promise-wrap";
import {Repository} from "./Repository";

export class UserRepository extends Repository {
    /**
     * @param {Client} connection
     */
    constructor(connection) {
        super(connection);
    }

    /**
     * @return {Promise<*>}
     */
    async createTableIfNotExist() {
        /** @type {UserRepository} */
        let self = this;
        return await PromiseWrap.asyncWrap(async function() {
            try {
                await self.connection.query(
                    Repository.getCheckTableExistingString("User")
                );
            } catch (exception) {
                await self.connection.query(
                    "CREATE TABLE public.\"User\"\n" +
                    "(\n" +
                    "    id integer NOT NULL,\n" +
                    "    username \"char\"[],\n" +
                    "    \"createdAt\" date,\n" +
                    "    CONSTRAINT \"User_pkey\" PRIMARY KEY (id)\n" +
                    ")\n" +
                    "\n" +
                    "TABLESPACE pg_default;\n" +
                    "\n" +
                    "ALTER TABLE public.\"User\"\n" +
                    "    OWNER to postgres;"
                );
            }
        }, true);
    }

    /**
     *
     * @param {string} username
     * @return {Promise<number>}
     */
    async add(username) {
        /** @type {UserRepository} */
        let self = this;
        return await PromiseWrap.asyncWrap(async function() {
            return -1;
        }, true);
    }
    /**
     *
     * @param {string} username
     * @return {Promise<boolean>}
     */
    async delete(username) {
        /** @type {UserRepository} */
        let self = this;
        return await PromiseWrap.asyncWrap(async function() {
            return false;
        }, true);
    }

    /**
     *
     * @param {Object} searchParameters
     * @return {Promise<User|null>}
     */
    async find(searchParameters) {
        /** @type {UserRepository} */
        let self = this;
        return await PromiseWrap.asyncWrap(async function() {
            return new User({
                "id": null, "username": null, "createdAt": null
            });
        }, true);
    }
}