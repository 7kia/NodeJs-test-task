export class PromiseWrap {
    /**
     *
     * @param {Function} func
     * @param {boolean} wait
     * @param {boolean} throwOut
     * @param {Function} errorHandler
     * @return {Promise<any>}
     */
    static async asyncWrap(func, wait, throwOut = false, errorHandler = null) {
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

                reject(exception);
            }
        });
    }
}