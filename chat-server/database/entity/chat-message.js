import {ConvertToJson} from "./convert-to-json";

export class ChatMessage extends ConvertToJson {
    /**
     *
     * @param {Object} data
     */
    constructor(data) {
        super();
        /** @public {number} */
        this.id = data.id;
        /** @public {number} */
        this.chat = data.chat
        /** @public {number} */
        this.author = data.author;
        /** @public {string} */
        this.text = data.text;
        /** @public {Date} */
        this.createdAt = data.created_at;
    }

    /**
     * @return {{}}
     */
    asJson() {
        return {
            id: this.id,
            chat: this.chat,
            author: this.author,
            text: this.text,
            createdAt: this.createdAt,
        }
    }
}