import {User} from "../entity/user";
import {PromiseWrap} from "../../helper-modules/promise-wrap";
import {Repository} from "./repository";
import {logger} from "../../helper-modules/logger";
import {EntityExtractor} from "./entity-extractor";
import {ErrorMessageGenerator} from "../../helper-modules/error-message-generator";
import {MessageGenerator} from "../../helper-modules/message-generator";

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
                    "    id integer NOT NULL DEFAULT nextval('\"User_id_seq\"'::regclass),\n" +
                    "    username \"char\"[],\n" +
                    "    \"created_at\" date,\n" +
                    "    CONSTRAINT \"User_pkey\" PRIMARY KEY (id)\n" +
                    ")\n" +
                    "\n" +
                    "TABLESPACE pg_default;\n" +
                    "\n" +
                    "ALTER TABLE public.\"User\"\n" +
                    "    OWNER to postgres;"
                );
                logger.info(MessageGenerator.generateCreateTable("User"));
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
            /** @type {any} */
            const res =  await self.connection.query(
                Repository.getInsertQueueString("User", {
                    "username": username, "created_at": Repository.generateNowTimeString()
                }, true)
            );
            logger.info(MessageGenerator.generateAddEntity("User", res.rows[0].id));
            return res.rows[0].id;
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
            /** @type {any} */
            const res = await self.connection.query(
                Repository.getDeleteQueueString("User", {
                    "username": username
                })
            );
            if (res.rowCount) {
                logger.info(MessageGenerator.generateDeleteEntity(
                    "User", {"username": username}
                ));
                return true;
            }
            throw new Error(ErrorMessageGenerator.generateEntityNotDelete("User",{"username": username}));
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
            /** @type {any} */
            const res =  await self.connection.query(
                Repository.getSelectQueueString("User", searchParameters, true)
            );
            if (res.rows[0]) {
                logger.info(MessageGenerator.generateFindEntity("User", searchParameters));
                return EntityExtractor.extractUser(res.rows[0]);
            }
            return null;
        }, true);
    }
}