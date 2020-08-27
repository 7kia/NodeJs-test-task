import {sprintf} from "sprintf-js";

export class MessageGenerator {
    /**
     * @param {Array<number>} userList
     * @return {string}
     */
    static generateUserListNotExist(userList) {
        return sprintf("Users %j not exist", userList);
    }

    /**
     * @param {number} id
     * @return {string}
     */
    static generateChatExist(id) {
        return sprintf("Chat with id %i exist", id);
    }

    /**
     * @param {number} id
     * @return {string}
     */
    static generateChatNotExist(id) {
        return sprintf("Chat with id %i not exist", id);
    }

    /**
     * @return {string}
     */
    static generateTrySendEmptyMessage() {
        return "Try send empty message";
    }

    /**
     * @param {string} username
     * @return {string}
     */
    static generateUserExist(username) {
        return sprintf("User with name %s exist", username);
    }

    /**
     * @param {string} username
     * @return {string}
     */
    static generateUserNotExist(username) {
        return sprintf("User with name %s not exist", username);
    }
}