import {PromiseWrap} from "../../helper-modules/promise-wrap";
import {ChatMessage} from "../entity/chat-message";
import {Repository} from "./repository";
import {logger} from "../../helper-modules/logger";
import {MessageGenerator} from "../../helper-modules/message-generator";
import {ErrorMessageGenerator} from "../../helper-modules/error-message-generator";
import {EntityExtractor} from "./entity-extractor";

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
                    "    id integer NOT NULL DEFAULT nextval('\"User_id_seq\"'::regclass),\n" +
                    "    chat integer,\n" +
                    "    author integer,\n" +
                    "    text \"char\"[],\n" +
                    "    \"created_at\" date,\n" +
                    "    CONSTRAINT \"Message_pkey\" PRIMARY KEY (id)\n" +
                    ")\n" +
                    "\n" +
                    "TABLESPACE pg_default;\n" +
                    "\n" +
                    "ALTER TABLE public.\"Message\"\n" +
                    "    OWNER to postgres;"
                );
                logger.info(MessageGenerator.generateCreateTable("Message"));
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
        /** @type {MessageRepository} */
        let self = this;
        return await PromiseWrap.asyncWrap(async function() {
            /** @type {any} */
            const res = await self.connection.query(
                Repository.getInsertQueueString("Message", {
                    "chat": chatId, "author": author,
                    "text": text, "created_at": Repository.generateNowTimeString()
                }, true)
            );
            logger.info(MessageGenerator.generateAddEntity("Message", res.rows[0].id));
            return res.rows[0].id;
        }, true);
    }

    /**
     * @param {number} id
     * @return {Promise<boolean>}
     */
    async delete(id) {
        /** @type {MessageRepository} */
        let self = this;
        return await PromiseWrap.asyncWrap(async function() {
            /** @type {any} */
            const res = await self.connection.query(
                Repository.getDeleteQueueString("Message", {
                    "id": id
                })
            );
            if (res.rowCount) {
                logger.info(MessageGenerator.generateDeleteEntity(
                    "Message", {"id": id}
                ));
                return true;
            }
            throw new Error(ErrorMessageGenerator.generateEntityNotDelete("Message", {"id": id}));
        }, true);
    }
    /**
     *
     * @param {number} chatId
     * @return {Promise<Array<ChatMessage>>}
     */
    async getMessages(chatId) {
        /** @type {MessageRepository} */
        let self = this;
        return await PromiseWrap.asyncWrap(async function() {
            /** @type {any} */
            const res =  await self.connection.query(
                Repository.getSelectQueueString("Message", {"chat": chatId})
            );
            return EntityExtractor.extractChatMessages(res.rows);
        }, true);
    }
}