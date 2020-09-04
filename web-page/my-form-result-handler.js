import {EMAIL_INPUT, FormManager, FULL_NAME_INPUT} from "./form-manager.js";
import {FormValidater} from "./form-validater.js";
import {PromiseWrap} from "./promise-wrap.js";

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Имя FormResultHandler конфликтует с именем из Express
 */
export class MyFormResultHandler {
    /**
     * @param {Object} query
     * @return {Promise<boolean>} true - repeat send, false - not repeat
     */
    static async handle(query) {
        return await PromiseWrap.asyncWrap(async () => {
            /** @type {Object} */
            const validateResult = FormValidater.validate(query);
            FormManager.setErrorMessages(validateResult["errorFields"]);

            /** @type {string} */
            let requestResult = "";
            if (!validateResult.isValid) {
                FormManager.setButtonNotActive();
                if (query[EMAIL_INPUT] === "e%40e.com") {
                    requestResult = MyFormResultHandler.#extractJsonFrom("ajax-request/error.json");
                } else if (query[FULL_NAME_INPUT] === "progress+1+1") {
                    requestResult = MyFormResultHandler.#extractJsonFrom("ajax-request/progress.json");
                } else {
                    requestResult = MyFormResultHandler.#extractJsonFrom("ajax-request/success.json");
                }
                return await MyFormResultHandler.#fillResultContainer(requestResult);
            }
            return false;
        }, true);
    }

    static #extractJsonFrom(fileUrl) {
        try {
            const xhr = new XMLHttpRequest();
            xhr.open("GET", fileUrl, false);
            xhr.send();
            if (xhr.status !== 200) {
                return xhr.status.toString();
            } else {
                return JSON.parse(xhr.responseText);
            }
        } catch (exception) {
            return exception.message;
        }
    }

    /**
     *
     * @param json
     * @return {Promise<boolean>} true - repeat send, false - not repeat
     */
    static async #fillResultContainer(json) {
        return await PromiseWrap.asyncWrap(async () => {
            let resultContainer = $("#my-form__result-container")[0];
            MyFormResultHandler.#resetResultContainer(resultContainer);

            if(json["status"] === "error") {
                resultContainer.append(json["reason"]);
            } else if (json["status"] === "progress") {
                resultContainer.append("Loading...");
                await sleep(2000);
                return true;
            } else {
                resultContainer.append("Success");
            }
            return false;
        }, true);
    }


    static #resetResultContainer(resultContainer) {
        let childes = resultContainer.childNodes;
        if (childes.length) {
            childes[0].remove();
        }
    }
}