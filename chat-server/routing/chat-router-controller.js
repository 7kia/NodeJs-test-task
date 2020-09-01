import {PromiseWrap} from "../helper-modules/promise-wrap";

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
     * @return {Promise}
     */
    async add(req, res) {
        let self = this;
        return await PromiseWrap.asyncRouteSendWrap(async function() {
            await self.rules.canAddChat(req.body);
            res.send({"id": await self.strategies.addChat(req.body)});
        }, req, res);
    }

    /**
     * @param {Request} req
     * @param {Response} res
     * @return {Promise}
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
     * @return {Promise}
     */
    async addMessageToChat(req, res) {
        let self = this;
        return await PromiseWrap.asyncRouteSendWrap(async function() {
            await self.rules.canAddMessage(req.body);
            res.send({"id": await self.strategies.addMessage(req.body)});
        }, req, res);
    }

    /**
     * @param {Request} req
     * @param {Response} res
     * @return {Promise}
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
            res.send(ChatRouterController.#convertToJson(chatList, "chatList"));
        }, req, res);
    }

    /**
     * @param {Array<ConvertToJson>} list
     * @param {string} listName
     * @return {Object}
     */
    static #convertToJson = function (list, listName) {
        /** @type {Object} */
        let requestResult = {};
        requestResult[listName] = [];
        for(let i = 0; i < list.length; i++) {
            /** @type {ConvertToJson} */
            const element = list[i];
            requestResult[listName].push(element.asJson());
        }
        return requestResult;
    }

    /**
     * @param {Request} req
     * @param {Response} res
     * @return {Object}
     */
    async getMessagesFromChat(req, res) {
        let self = this;
        return await PromiseWrap.asyncRouteSendWrap(async function() {
            await self.rules.canGetMessagesFromChat(req.body)
            /** @type {Array<ChatMessage>} */
            const messages = await self.strategies.getMessagesFromChat(req.body);
            res.send(ChatRouterController.#convertToJson(messages, "messageList"));
        }, req, res);
    }
}