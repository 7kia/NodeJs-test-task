import {ConvertToJson} from "./convert-to-json";

export class Chat extends ConvertToJson{
    /**
     * *
     * @param {Object} data
     */
    constructor(data) {
        super();
        /** @public {number} */
        this.id = data.id;
        /** @public {string} */
        this.name = data.name;
        /** @public {Array<number>} */
        this.users = data.users;
        /** @public {Date} */
        this.createdAt = data.created_at;
    }

    /**
     * @return {Object}
     */
    asJson() {
        return {
            id: this.id,
            name: this.name,
            users: this.users,
            createdAt: this.createdAt,
        }
    }
}