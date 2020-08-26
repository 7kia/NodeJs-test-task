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
            await self.rules.canAddChat(req.body);
            /** @type {Chat} */
            const newChat = await self.strategies.addChat(req.body);
            return newChat.asJson();
        }, req, res);
    }

    /**
     * @param {Request} req
     * @param {Response} res
     */
    async delete(req, res) {
        let self = this;
        return await PromiseWrap.asyncRouteSendWrap(async function() {
            await self.rules.canDeleteChat(req.body);
            await self.strategies.deleteChat(req.body);
        }, req, res);
    }

    /**
     * @param {Request} req
     * @param {Response} res
     */
    async addMessageToChat(req, res) {
        let self = this;
        return await PromiseWrap.asyncRouteSendWrap(async function() {
            await self.rules.canAddMessage(req.body);
            /** @type {Message} */
            const newMessage = await self.strategies.addMessage(req.body);
            return newMessage.asJson();
        }, req, res);
    }

    /**
     * @param {Request} req
     * @param {Response} res
     */
    async deleteMessageToChat(req, res) {
        let self = this;
        return await PromiseWrap.asyncRouteSendWrap(async function() {
            await self.rules.canDeleteMessage(req.body);
            await self.strategies.deleteMessage(req.body);
        }, req, res);
    }

    /**
     * @param {Request} req
     * @param {Response} res
     */
    async getListForUser(req, res) {
        let self = this;
        return await PromiseWrap.asyncRouteSendWrap(async function() {
            await self.rules.canGetListForUser(req.body);
            /** @type {Array<Chat>} */
            const chatList = await self.strategies.getListForUser(req.body);
            return ChatRouterController.#convertToJson(chatList);
        }, req, res);
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
            await self.rules.canGetMessagesFromChat(req.body);
            /** @type {Array<ChatMessage>} */
            const messages = await self.strategies.getMessagesFromChat(req.body);
            return ChatRouterController.#convertToJson(messages);
        }, req, res);
    }
}