import {PromiseWrap} from "../helper-modules/promise-wrap";
import {sprintf} from "sprintf-js";
import {UserRequestRules} from "./user-request-rules";
import {MessageGenerator} from "../helper-modules/message-generator";

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
            const chatNameNotEmpty = ChatRequestRules.#chatNameNotEmpty(json);
            /** @type {boolean} */
            const usersExist = await ChatRequestRules.#usersExist(
                json, self.userRepository
            );
            /** @type {boolean} */
            const chatWithUsersNotExist = await ChatRequestRules.#chatWithUsersNotExist(
                json, self.chatRepository
            );
            return chatNameNotEmpty && usersExist && chatWithUsersNotExist;
        }, true);
    }

    /**
     * @param {Object} json
     * @return {boolean}
     */
    static #chatNameNotEmpty = function (json) {
        return ChatRequestRules.#notEmpty(json["name"]);
    }

    /**
     * @param {string|null} str
     * @return {boolean}
     */
    static #notEmpty = function (str) {
        return (str !== "")
            && (str !== undefined)
            && (str !== null);
    }

    /**
     * @param {Object} json
     * @param {UserRepository} userRepository
     * @return {Promise<boolean>}
     */
    static #usersExist = async function(json, userRepository) {
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
                throw new Error(MessageGenerator.generateUserListNotExist(notExistUsers));
            }
            return true;
        }, true);
    }

    /**
     *
     * @param {Object} json
     * @param {ChatRepository} chatRepository
     * @return {Promise<boolean>}
     */
    static #chatWithUsersNotExist = async function (
        json, chatRepository
    ) {
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
            /** @type {number} */
            const id = json["id"];
            if (!await ChatRequestRules.#existChat({"id": id}, self.chatRepository)) {
                throw new Error(MessageGenerator.generateChatNotExist(id));
            }
            return true;
        }, true);
    }

    /**
     * @param {Object} fields
     * @param {ChatRepository} chatRepository
     * @return {Promise<boolean>}
     */
    static #existChat = async function (fields, chatRepository) {
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
            /** @type {number} */
            const id = json["id"];
            if (!await ChatRequestRules.#existChat({"id": id}, self.chatRepository)) {
                throw new Error(sprintf(
                    MessageGenerator.generateChatNotExist(id)
                ));
            }
            return true;
        }, true);
    }

    /**
     * @param {Object} json
     * @return {Promise<boolean>}
     */
    async canGetListForUser(json) {
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
    async canGetMessagesFromChat(json) {
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
    static #messageNotEmpty = function (json) {
        if (ChatRequestRules.#notEmpty(json["text"])) {
            return true;
        }
        throw new Error(MessageGenerator.generateTrySendEmptyMessage());
    }
}