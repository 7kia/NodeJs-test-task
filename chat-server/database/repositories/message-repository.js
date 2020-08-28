import {PromiseWrap} from "../../helper-modules/promise-wrap";
import {ChatMessage} from "../entity/chat-message";
import {Repository} from "./Repository";

export class MessageRepository extends Repository {
    /**
     * @param {Client} connection
     */
    constructor(connection) {
        super();
        this.connection = connection;
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
                    Repository.getCheckTableExistingString("Message")
                );
            } catch (exception) {
                await self.connection.query(
                    "CREATE TABLE public.\"Message\"\n" +
                    "(\n" +
                    "    id integer NOT NULL,\n" +
                    "    chat integer,\n" +
                    "    author integer,\n" +
                    "    text \"char\"[],\n" +
                    "    \"createdAt\" date,\n" +
                    "    CONSTRAINT \"Message_pkey\" PRIMARY KEY (id)\n" +
                    ")\n" +
                    "\n" +
                    "TABLESPACE pg_default;\n" +
                    "\n" +
                    "ALTER TABLE public.\"Message\"\n" +
                    "    OWNER to postgres;"
                );
            }
        }, true);
    }

    /**
     * @param {number} chatId
     * @param {number} author
     * @param {string} text
     * @return {Promise<number>}
     */
    async add(chatId, author, text) {
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
        return await PromiseWrap.asyncWrap(async function() {
            return false;
        }, true);
    }
    /**
     *
     * @param {number} chatId
     * @return {Promise<Array<ChatMessage>>}
     */
    async getMessages(chatId) {
        return await PromiseWrap.asyncWrap(async function() {
            return [
                new ChatMessage({
                    "id": null, "chat": null, "author": null,
                    "text": null, "createdAt": null
                })
            ];
        }, true);
    }
}