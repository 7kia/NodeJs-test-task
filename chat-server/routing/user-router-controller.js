import {PromiseWrap} from "../promise-wrap";

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
     */
    async add(req, res) {
        let self = this;
        return await PromiseWrap.asyncRouteSendWrap(async function() {
            await self.rules.canAddUser(req.body);
            /** @type {User} */
            const newUser = await self.strategies.addUser(req.body);
            return newUser.asJson();
        }, req, res);
    }

    /**
     * @param {Request} req
     * @param {Response} res
     */
    async delete(req, res) {
        let self = this;
        return await PromiseWrap.asyncRouteSendWrap(async function() {
            await self.rules.canDeleteUser(req.body);
            await self.strategies.deleteUser(req.body);
        }, req, res);
    }
}