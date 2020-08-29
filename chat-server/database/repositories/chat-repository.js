import {PromiseWrap} from "../../helper-modules/promise-wrap";
import {Chat} from "../entity/chat";
import {Repository} from "./repository";
import {logger} from "../../helper-modules/logger";
import {sprintf} from "sprintf-js";
import {EntityExtractor} from "./entity-extractor";
import {MessageGenerator} from "../../helper-modules/message-generator";
import {ErrorMessageGenerator} from "../../helper-modules/error-message-generator";

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
                    "    id integer NOT NULL DEFAULT nextval('\"User_id_seq\"'::regclass),\n" +
                    "    name \"char\"[],\n" +
                    "    users integer[],\n" +
                    "    \"created_at\" date,\n" +
                    "    CONSTRAINT \"Chat_pkey\" PRIMARY KEY (id)\n" +
                    ")\n" +
                    "\n" +
                    "TABLESPACE pg_default;\n" +
                    "\n" +
                    "ALTER TABLE public.\"Chat\"\n" +
                    "    OWNER to postgres;"
                );
                logger.info(MessageGenerator.generateCreateTable("Chat"));
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
            /** @type {any} */
            const res = await self.connection.query(
                Repository.getInsertQueueString("Chat", {
                    "name": name, "users": users, "created_at": Repository.generateNowTimeString()
                }, true)
            );
            logger.info(MessageGenerator.generateAddEntity("Chat", res.rows[0].id));
            return res.rows[0].id;
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
            /** @type {any} */
            const res = await self.connection.query(
                Repository.getDeleteQueueString("Chat", {
                    "id": id
                })
            );
            if (res.rowCount) {
                logger.info(MessageGenerator.generateDeleteEntity(
                    "Chat", {"id": id}
                ));
                return true;
            }
            throw new Error(ErrorMessageGenerator.generateUserNotDelete("Chat", {"id": id}));
        }, true);
    }

    /**
     *
     * @param {Object} searchParameters
     * @return {Promise<Chat>}
     */
    async find(searchParameters) {
        /** @type {ChatRepository} */
        let self = this;
        return await PromiseWrap.asyncWrap(async function() {
            /** @type {any} */
            const res =  await self.connection.query(
                Repository.getSelectQueueString("Chat", searchParameters, true)
            );
            if (res.rows[0]) {
                logger.info(MessageGenerator.generateFindEntity("Chat", searchParameters));
                return EntityExtractor.extractChat(res.rows[0]);
            }
            return null;
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
            /** @type {any} */
            const res =  await self.connection.query(
                Repository.getSelectQueueString("Chat", sprintf("%i=ANY(users)", userId))
            );
            logger.info(MessageGenerator.generateFindChatsForUser(userId, res.rows));
            return EntityExtractor.extractChats(res.rows);
        }, true);
    }
}