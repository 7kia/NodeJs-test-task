import {ConvertToJson} from "./convert-to-json";

export class User extends ConvertToJson {
    /**
     * @param {Object} data
     */
    constructor(data) {
        super();
        /** @public {number} */
        this.id = data.id;
        /** @public {string} */
        this.username = data.username;
        /** @public {string} Преобразование в Date пока не нужно */
        this.createdAt = data.created_at;
    }

    /**
     * @return {Object}
     */
    asJson() {
        return {
            id: this.id,
            username: this.username,
            createdAt: this.createdAt,
        }
    }
}