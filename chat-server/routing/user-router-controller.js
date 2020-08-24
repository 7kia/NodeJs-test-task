import {PromiseWrap} from "../promise-wrap";

export class UserRouterController {
    /**
     *
     * @param {UserAggregate} userAggregate
     */
    constructor(userAggregate) {
        /** @private {UserAggregate} */
        this.userAggregate = userAggregate;
    }

    /**
     * @param {Request} req
     * @param {Response} res
     */
    async add(req, res) {
        return await PromiseWrap.asyncRouteSendWrap(async function() {
            this.userAggregate.checkInputData(req.body);
            /** @type {User} */
            const newUser = await this.userAggregate.addUser(req.body);
            return newUser.asJson();
        }, true);
    }

    /**
     * @param {Request} req
     * @param {Response} res
     */
    delete(req, res) {
        res.send('User Delete tests');
    }
}