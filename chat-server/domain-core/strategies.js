export class Strategies {
    /**
     * @param {UserRequestStrategies} userRequestStrategies
     * @param {ChatRequestStrategies} chatRequestStrategies
     */
    constructor(userRequestStrategies, chatRequestStrategies) {
        /** @public {UserRequestStrategies} */
        this.userRequestStrategies = userRequestStrategies;
        /** @public {ChatRequestStrategies} */
        this.chatRequestStrategies = chatRequestStrategies;
    }
}