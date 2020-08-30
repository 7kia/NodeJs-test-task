import {User} from "../entity/user";
import {Chat} from "../entity/chat";
import {ChatMessage} from "../entity/chat-message";

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

    /**
     * @param {Array<Object>} data
     * @return {Array<ChatMessage>}
     */
    static extractChatMessages(data) {
        /** @type {Array<ChatMessage>} */
        let result = [];
        for (let i = 0; i < data.length; i++) {
            result.push(EntityExtractor.extractChatMessage(data[i]));
        }
        return result;
    }

    /**
     * @param {Object} data
     * @return {ChatMessage}
     */
    static extractChatMessage(data) {
        return new ChatMessage({
            "id": data.id, "chat": data.chat, "author": data.author,
            "text": data.text, "created_at": data.created_at
        });
    }
}