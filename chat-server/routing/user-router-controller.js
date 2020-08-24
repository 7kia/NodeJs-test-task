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
    add(req, res) {
        res.send('User Add tests');
    }

    /**
     * @param {Request} req
     * @param {Response} res
     */
    delete(req, res) {
        res.send('User Delete tests');
    }
}