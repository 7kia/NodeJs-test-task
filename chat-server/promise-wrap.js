export class PromiseWrap {
    /**
     *
     * @param func
     * @param wait
     * @param {Function} errorHandler
     * @return {Promise<any>}
     */
    static async asyncWrap(func, wait, errorHandler = null) {
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

    /**
     *
     * @param {Function} func
     * @param {Request} req
     * @param {Response} res
     * @return {Promise<*>}
     */
    static async asyncRouteSendWrap(func, req, res) {
        return await PromiseWrap.asyncWrap(async function() {
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