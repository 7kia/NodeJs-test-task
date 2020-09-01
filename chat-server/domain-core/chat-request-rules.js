import {PromiseWrap} from "../helper-modules/promise-wrap";
import {UserRequestRules} from "./user-request-rules";
import {ErrorMessageGenerator} from "../helper-modules/error-message-generator";

export class ChatRequestRules {
    /**
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
            if (!chatNameNotEmpty) {
                throw new Error(ErrorMessageGenerator.chatNameEmpty());
            }
            /** @type {boolean} */
            const usersExist = await ChatRequestRules.#usersExist(
                json, self.userRepository
            );
            /** @type {boolean} */
            const chatWithUsersNotExist = await ChatRequestRules.#chatWithUsersNotExist(
                json, self.chatRepository
            );
            if (!chatWithUsersNotExist) {
                throw new Error(ErrorMessageGenerator.generateChatExist({"users": json["users"]}));
            }
            return chatNameNotEmpty && usersExist && chatWithUsersNotExist;
        }, true, true);
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
                if (!await userRepository.find({"id": userId})) {
                    notExistUsers.push(userId);
                }
            }

            if (notExistUsers.length) {
                throw new Error(ErrorMessageGenerator.generateUserListNotExist(notExistUsers));
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
            return await chatRepository.find({"users": json["users"]}) === null;
        }, true, true);
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
                throw new Error(ErrorMessageGenerator.generateChatNotExist(id));
            }
            return true;
        }, true, true);
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
        }, true, true);
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
            );
            if (!chatExist) {
                throw new Error(ErrorMessageGenerator.generateChatNotExist(json["chat"]));
            }
            /** @type {boolean} */
            const authorExist = await UserRequestRules.existUser(
                {"id": json["author"]}, self.userRepository
            );
            if (!authorExist) {
                throw new Error(ErrorMessageGenerator.generateUserNotExist({"id": json["author"]}));
            }
            /** @type {boolean} */
            const messageNotEmpty = await ChatRequestRules.#messageNotEmpty(json);
            if (!messageNotEmpty) {
                throw new Error(ErrorMessageGenerator.generateTrySendEmptyMessage());
            }
            return chatExist && authorExist && messageNotEmpty;
        }, true, true);
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
            if (!await ChatRequestRules.#existMessage({"id": id}, self.messageRepository)) {
                throw new Error(ErrorMessageGenerator.generateMessageNotExist(id));
            }
            return true;
        }, true, true);
    }

    /**
     * @param {Object} json
     * @return {Promise<boolean>}
     */
    async canGetListForUser(json) {
        let self = this;
        return await PromiseWrap.asyncWrap(async function() {
            if (!await UserRequestRules.existUser(
                {"id": json["user"]}, self.userRepository
            )) {
                throw new Error(ErrorMessageGenerator.generateUserNotExist({"id": json["user"]}));
            }
            return true;
        }, true, true);
    }

    /**
     * @param {Object} json
     * @return {Promise<boolean>}
     */
    async canGetMessagesFromChat(json) {
        let self = this;
        return await PromiseWrap.asyncWrap(async function() {
            if (!await ChatRequestRules.#existChat(
                {"id": json["chat"]}, self.chatRepository
            )) {
                throw new Error(ErrorMessageGenerator.generateChatNotExist(json["chat"]));
            }
            return true;
        }, true, true);
    }

    /**
     *
     * @param {Object} json
     * @return {boolean}
     */
    static #messageNotEmpty = function (json) {
        if (ChatRequestRules.#notEmpty(json["text"])) {
            return true;
        }
        throw new Error(ErrorMessageGenerator.generateTrySendEmptyMessage(json["author"]));
    }

    /**
     * @param {Object} fields
     * @param {MessageRepository} messageRepository
     * @return {Promise<boolean>}
     */
    static #existMessage = async function (fields, messageRepository) {
        return await PromiseWrap.asyncWrap(async function() {
            /** @type {Chat} */
            const chat = await messageRepository.find(fields);
            return chat !== null;
        }, true, true);
    }
}