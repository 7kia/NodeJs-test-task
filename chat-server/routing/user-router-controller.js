import {PromiseWrap} from "../helper-modules/promise-wrap";

export class UserRouterController {
    /**
     * @param {UserRequestRules} rules
     * @param {UserRequestStrategies} strategies
     */
    constructor(rules, strategies) {
        /** @private {UserRequestRules} */
        this.rules = rules;
        /** @private {UserRequestStrategies} */
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
            await self.rules.canAddUser(req.body);
            /** @type {number} */
            const userId = await self.strategies.addUser(req.body);
            res.send({"id": userId});
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
            await self.rules.canDeleteUser(req.body);
            res.send(await self.strategies.deleteUser(req.body));
        }, req, res);
    }
}