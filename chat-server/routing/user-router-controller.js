export class UserRouterController {
    /**
     *
     * @param {UserAggregate} userAggregate
     */
    constructor(userAggregate) {
        /** @private {UserAggregate} */
        this.userAggregate = userAggregate;
    }
}