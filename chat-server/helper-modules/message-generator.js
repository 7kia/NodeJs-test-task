import {sprintf} from "sprintf-js";

export class MessageGenerator {
    /**
     * @param {string} name
     * @return {string}
     */
    static generateCreateTable(name) {
        return sprintf("Create table public.\"%s\"", name);
    }

    /**
     * @param {string} entityName
     * @param {string} id
     * @return {string}
     */
    static generateAddEntity(entityName, id) {
        return sprintf("Add %s with id=%s", entityName, id);
    }

    /**
     * @param {string} entityName
     * @param {Object} fields
     * @return {string}
     */
    static generateDeleteEntity(entityName,fields) {
        return sprintf("Delete %s with %j", entityName, fields);
    }

    /**
     * @param {string} entityName
     * @param {Object} searchParameters
     * @return {string}
     */
    static generateFindEntity(entityName, searchParameters) {
        return sprintf("Find %s with fields %j", entityName, searchParameters);
    }

    /**
     *
     * @param {number} userId
     * @param {Object} chats
     * @return {string}
     */
    static generateFindChatsForUser(userId, chats) {
        return sprintf("Find chats for user with id=%i. Found: %j", userId, chats);
    }
}