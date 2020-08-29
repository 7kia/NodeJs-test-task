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
     * @param {string} id
     * @return {string}
     */
    static generateAddUser(id) {
        return sprintf("Add user with id=%s", id);
    }

    /**
     * @param {string} username
     * @return {string}
     */
    static generateDeleteUser(username) {
        return sprintf("Delete user with name=%s", username);
    }

    /**
     *
     * @param {Object} searchParameters
     * @return {string}
     */
    static generateFindUser(searchParameters) {
        return sprintf("Find user with fields %j", searchParameters);
    }
}