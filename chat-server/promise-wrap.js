export class PromiseWrap {
    /**
     *
     * @param func
     * @param wait
     * @param {Function} errorHandler
     * @return {Promise<any>}
     */
    static async asyncPromise(func, wait, errorHandler = null) {
        return await new Promise(async (resolve, reject) => {
            try {
                if (wait) {
                    resolve(await func());
                } else {
                    resolve(func());
                }
            } catch (exception) {
                if (errorHandler) {
                    errorHandler(exception);
                }

                console.log(exception);
                reject(exception);
            }
        });
    }

    static async asyncRouteSendWrap(func, req, res) {
        return await PromiseWrap.asyncPromise(async function() {
            try {
                res.send(func());
            } catch (exception) {
                res.status(500);
                res.send(exception.message);
            }
            res.end();
        }, true);
    }

    static async asyncRouteGetWrap(func, req, res) {
        return await PromiseWrap.asyncPromise(async function() {
            try {
                res.send(func());
            } catch (exception) {
                res.status(500);
                res.send(exception.message);
            }
            res.end();
        }, true);
    }
}