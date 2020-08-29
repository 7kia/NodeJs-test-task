import {User} from "../entity/user";
import {Chat} from "../entity/chat";

export class EntityExtractor {
    /**
     * @param {Object} data
     * @return {User}
     */
    static extractUser(data) {
        return new User({
            "id": data.id,
            "username": data.username,
            "created_at": new Date(data.created_at)
        });
    }

    /**
     * @param {Array<Object>} data
     * @return {Array<Chat>}
     */
    static extractChats(data) {
        /** @type {Array<Chat>} */
        let result = [];
        for (let i = 0; i < data.length; i++) {
            result.push(EntityExtractor.extractChat(data[i]));
        }
        return result;
    }

    /**
     * @param {Object} data
     * @return {Chat}
     */
    static extractChat(data) {
        return new Chat({
            "id": data.id,
            "name": data.name,
            "users": data.users,
            "created_at": new Date(data.created_at)
        })
    }
}