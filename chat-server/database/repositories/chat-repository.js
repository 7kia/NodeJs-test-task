import {PromiseWrap} from "../../helper-modules/promise-wrap";
import {Chat} from "../entity/chat";
import {Repository} from "./Repository";

export class ChatRepository extends Repository {
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
        /** @type {MessageRepository} */
        let self = this;
        return await PromiseWrap.asyncWrap(async function() {
            try {
                await self.connection.query(
                    Repository.getCheckTableExistingString("Chat")
                );
            } catch (exception) {
                await self.connection.query(
                    "CREATE TABLE public.\"Chat\"\n" +
                    "(\n" +
                    "    id integer NOT NULL,\n" +
                    "    name \"char\"[],\n" +
                    "    users integer,\n" +
                    "    \"createdAt\" date,\n" +
                    "    CONSTRAINT \"Chat_pkey\" PRIMARY KEY (id)\n" +
                    ")\n" +
                    "\n" +
                    "TABLESPACE pg_default;\n" +
                    "\n" +
                    "ALTER TABLE public.\"Chat\"\n" +
                    "    OWNER to postgres;"
                );
            }
        }, true);
    }
    /**
     *
     * @param {string} name
     * @param {Array<number>} users
     * @return {Promise<number>}
     */
    async add(name, users) {
        /** @type {ChatRepository} */
        let self = this;
        return await PromiseWrap.asyncWrap(async function() {
            return -1;
        }, true);
    }
    /**
     *
     * @param {number} id
     * @return {Promise<boolean>}
     */
    async delete(id) {
        /** @type {ChatRepository} */
        let self = this;
        return await PromiseWrap.asyncWrap(async function() {
            return false;
        }, true);
    }

    /**
     *
     * @param {Object} fields
     * @return {Promise<Chat>}
     */
    async find(fields) {
        /** @type {ChatRepository} */
        let self = this;
        return await PromiseWrap.asyncWrap(async function() {
            return new Chat({
                "id": null, "name": null, "users": null, "createdAt": null
            });
        }, true);
    }

    /**
     *
     * @param {number} userId
     * @return {Promise<Array<Chat>>}
     */
    async findAllForUser(userId) {
        /** @type {ChatRepository} */
        let self = this;
        return await PromiseWrap.asyncWrap(async function() {
            return [
                new Chat({
                    "id": null, "name": null, "users": null, "createdAt": null
                })
            ];
        }, true);
    }
}