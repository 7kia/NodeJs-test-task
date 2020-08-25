import {PromiseWrap} from "../promise-wrap";

export class ChatRouterController {
    /**
     * @param {ChatRequestRules} rules
     * @param {ChatRequestStrategies} strategies
     */
    constructor(rules, strategies) {
        /** @private {ChatRequestRules} */
        this.rules = rules;
        /** @private {ChatRequestStrategies} */
        this.strategies = strategies;
    }


    /**
     * @param {Request} req
     * @param {Response} res
     */
    async add(req, res) {
        let self = this;
        return await PromiseWrap.asyncRouteSendWrap(async function() {
            self.rules.checkNewChatData(req.body);
            /** @type {Chat} */
            const newChat = await self.strategies.addChat(req.body);
            return newChat.asJson();
        }, true);
    }

    /**
     * @param {Request} req
     * @param {Response} res
     */
    async delete(req, res) {
        let self = this;
        return await PromiseWrap.asyncRouteSendWrap(async function() {
            self.rules.checkDeleteChatData(req.body);
            await self.strategies.deleteChat(req.body);
        }, true);
    }

    /**
     * @param {Request} req
     * @param {Response} res
     */
    async addMessageToChat(req, res) {
        let self = this;
        return await PromiseWrap.asyncRouteSendWrap(async function() {
            self.rules.checkNewMessageData(req.body);
            /** @type {Message} */
            const newMessage = await self.strategies.addMessage(req.body);
            return newMessage.asJson();
        }, true);
    }

    /**
     * @param {Request} req
     * @param {Response} res
     */
    async deleteMessageToChat(req, res) {
        let self = this;
        return await PromiseWrap.asyncRouteSendWrap(async function() {
            self.rules.checkDeleteMessageData(req.body);
            await self.strategies.deleteMessage(req.body);
        }, true);
    }

    /**
     * @param {Request} req
     * @param {Response} res
     */
    async getListForUser(req, res) {
        let self = this;
        return await PromiseWrap.asyncRouteSendWrap(async function() {
            self.rules.checkGetListForUserRequestData(req.body);
            /** @type {Array<Chat>} */
            const chatList = await self.strategies.getListForUser(req.body);
            return ChatRouterController.#convertToJson(chatList);
        }, true);
    }

    /**
     *
     * @param {Array<ConvertToJson>} list
     * @return {Object}
     */
    static #convertToJson = function (list) {
        /** @type {Object} */
        let requestResult = {"chatList": []};
        for(let i = 0; i < list.length; i++) {
            /** @type {ConvertToJson} */
            const element = list[i];
            requestResult["chatList"].push(element.asJson());
        }
        return requestResult;
    }


    /**
     * @param {Request} req
     * @param {Response} res
     */
    async getMessagesFromChat(req, res) {
        let self = this;
        return await PromiseWrap.asyncRouteSendWrap(async function() {
            self.rules.checkGetMessagesFromChatRequestData(req.body);
            /** @type {Array<ChatMessage>} */
            const messages = await self.strategies.getMessagesFromChat(req.body);
            return ChatRouterController.#convertToJson(messages);
        }, true);
    }
}