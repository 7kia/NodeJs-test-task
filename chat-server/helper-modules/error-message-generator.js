import {sprintf} from "sprintf-js";

export class ErrorMessageGenerator {
    /**
     * @param {Array<number>} userList
     * @return {string}
     */
    static generateUserListNotExist(userList) {
        return sprintf("Users %j not exist", userList);
    }

    /**
     * @param {Object} data
     * @return {string}
     */
    static generateChatExist(data) {
        return sprintf("Chat with %j exist", data);
    }

    /**
     * @param {number} id
     * @return {string}
     */
    static generateChatNotExist(id) {
        return sprintf("Chat with id %i not exist", id);
    }

    /**
     * @param {number} authorId
     * @return {string}
     */
    static generateTrySendEmptyMessage(authorId) {
        return sprintf("User with id %i try send empty message", authorId);
    }

    /**
     * @param {string} username
     * @return {string}
     */
    static generateUserExist(username) {
        return sprintf("User with name %s exist", username);
    }

    /**
     * @param {Object} data
     * @return {string}
     */
    static generateUserNotExist(data) {
        return sprintf("User with %j not exist", data);
    }

    /**
     * @param {string} entityName
     * @param {Object} fields
     * @return {string}
     */
    static generateEntityNotDelete(entityName, fields) {
        return sprintf("%s with %j not delete", entityName, fields);
    }

    /**
     * @return {string}
     */
    static chatNameEmpty() {
        return "Chat name is empty";
    }

    /**
     * @param {number} id
     * @return {string}
     */
    static generateMessageNotExist(id) {
        return sprintf("Message with id %i", id);
    }
}