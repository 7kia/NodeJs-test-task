export class Rules {
    /**
     * @param {UserRequestRules} userRequestRules
     * @param {ChatRequestRules} chatRequestRules
     */
    constructor(userRequestRules, chatRequestRules) {
        /** @public {UserRequestRules} */
        this.userRequestRules = userRequestRules;
        /** @public {ChatRequestRules} */
        this.chatRequestRules = chatRequestRules;
    }
}