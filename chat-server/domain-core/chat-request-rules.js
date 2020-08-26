import {PromiseWrap} from "../promise-wrap";
import {sprintf} from "sprintf-js";
import {UserRequestRules} from "./user-request-rules";

export class ChatRequestRules {
    /**
     *
     * @param {ChatRepository} chatRepository
     * @param {MessageRepository} messageRepository
     * @param {UserRepository} userRepository
     */
    constructor(
        chatRepository,
        messageRepository,
        userRepository
    ) {
        /** @private {ChatRepository} */
        this.chatRepository = chatRepository;
        /** @private {MessageRepository} */
        this.messageRepository = messageRepository;
        /** @private {UserRepository} */
        this.userRepository = userRepository;
    }

    /**
     * @param {Object} json
     */
    async canAddChat(json) {
        let self = this;
        return await PromiseWrap.asyncWrap(async function() {
            /** @type {boolean} */
            const chatNameNotEmpty = ChatRequestRules.#chatNameNotEmpty(
                json, self.chatRepository
            );
            /** @type {boolean} */
            const usersExist = await ChatRequestRules.#usersExist(
                json, self.userRepository
            );
            /** @type {boolean} */
            const chatWithUsersNotExist = await ChatRequestRules.#chatWithUsersNotExist(
                json, self.chatRepository, self.userRepository
            );
            return chatNameNotEmpty && usersExist && chatWithUsersNotExist;
        }, true);
    }

    /**
     * @param {Object} json
     * @param {ChatRepository} chatRepository
     * @return {boolean}
     */
    static #chatNameNotEmpty(json, chatRepository) {
        return ChatRequestRules.#notEmpty(json["name"]);
    }

    /**
     * @param {string|null} str
     * @return {boolean}
     */
    static #notEmpty(str) {
        return (str !== "")
            && (str !== undefined)
            && (str !== null);
    }

    /**
     * @param {Object} json
     * @param {UserRepository} userRepository
     * @return {Promise<boolean>}
     */
    static async #usersExist(json, userRepository) {
        return await PromiseWrap.asyncWrap(async function() {
            /** @type {Array<number>} */
            let notExistUsers = [];
            /** @type {Array<number>} */
            const users = json["users"];
            for (let i = 0; i < users.length; i++) {
                /** @type {number} */
                const userId = users[i];
                if (!await userRepository.get({"id": userId})) {
                    notExistUsers.push(userId);
                }
            }

            if (notExistUsers.length) {
                throw new Error(sprintf("Users %j not exist", notExistUsers));
            }
            return true;
        }, true);
    }

    /**
     *
     * @param {Object} json
     * @param {ChatRepository} chatRepository
     * @param {UserRepository} userRepository
     * @return {Promise<boolean>}
     */
    static async #chatWithUsersNotExist(json, chatRepository, userRepository) {
        return await PromiseWrap.asyncWrap(async function() {
            return !await chatRepository.find({"users": json["users"]})
        }, true);
    }

    /**
     * @param {Object} json
     * @return {Promise<boolean>}
     */
    async canDeleteChat(json) {
        let self = this;
        return await PromiseWrap.asyncWrap(async function() {
            /** @type {Array<number>} */
            const users = json["users"];
            if (!await ChatRequestRules.#existChat({"users": users}, self.chatRepository)) {
                throw new Error(sprintf(
                    "Chat with name %s and users %j not exist", json["name"], users
                ));
            }
            return true;
        }, true);
    }

    /**
     * @param {Object} fields
     * @param {ChatRepository} chatRepository
     * @return {Promise<boolean>}
     */
    static async #existChat(fields, chatRepository) {
        return await PromiseWrap.asyncWrap(async function() {
            /** @type {Chat} */
            const chat = await chatRepository.find(fields);
            return chat !== null;
        }, true);
    }

    /**
     * @param {Object} json
     * @return {Promise<boolean>}
     */
    async canAddMessage(json) {
        let self = this;
        return await PromiseWrap.asyncWrap(async function() {
            /** @type {boolean} */
            const chatExist = await ChatRequestRules.#existChat(
                {"id": json["chat"]}, self.chatRepository
            )
            /** @type {boolean} */
            const authorExist = await UserRequestRules.existUser(
                {"id": json["author"]}, self.userRepository
            )
            /** @type {boolean} */
            const messageNotEmpty = await ChatRequestRules.#messageNotEmpty(json);

            return chatExist && authorExist && messageNotEmpty;
        }, true);
    }

    /**
     * @param {Object} json
     * @return {Promise<boolean>}
     */
    async canDeleteMessage(json) {
        let self = this;
        return await PromiseWrap.asyncWrap(async function() {
            /** @type {boolean} */
            const id = json["id"];
            if (!await ChatRequestRules.#existChat({"id": id}, self.chatRepository)) {
                throw new Error(sprintf(
                    "Chat with id %i not exist", id
                ));
            }
            return true;
        }, true);
    }

    /**
     * @param {Object} json
     * @return {Promise<boolean>}
     */
    async canGetListForUserRequestData(json) {
        let self = this;
        return await PromiseWrap.asyncWrap(async function() {
            return await UserRequestRules.existUser(
                {"id": json["user"]}, self.userRepository
            );
        }, true);
    }

    /**
     * @param {Object} json
     * @return {Promise<boolean>}
     */
    async canGetMessagesFromChatRequestData(json) {
        let self = this;
        return await PromiseWrap.asyncWrap(async function() {
            return await ChatRequestRules.#existChat(
                {"id": json["chat"]}, self.chatRepository
            );
        }, true);      }

    /**
     *
     * @param {Object} json
     * @return {boolean}
     */
    static #messageNotEmpty(json) {
        if (ChatRequestRules.#notEmpty(json["text"])) {
            return true;
        }
        throw new Error("Try send empty message");
    }
}