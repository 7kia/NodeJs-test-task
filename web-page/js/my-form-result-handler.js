import {EMAIL_INPUT, FormManager, FULL_NAME_INPUT} from "./form-manager.js";
import {FormValidator} from "./form-validator.js";
import {PromiseWrap} from "./promise-wrap.js";

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/** @type {string} */
const ERROR_CLASS = "my-form__result-container_error";
/** @type {string} */
const PROGRESS_CLASS = "my-form__result-container_progress";
/** @type {string} */
const SUCCESS_CLASS = "my-form__result-container_success";

/**
 * Имя FormResultHandler конфликтует с именем из Express
 */
export class MyFormResultHandler {
    constructor() {
        /** @private {FormValidator} */
        this.formValidator = new FormValidator();
    }
    /**
     * @param {Object} query
     * @return {Promise<boolean>} true - repeat send, false - not repeat
     */
    async handle(query) {
        let self = this;
        return await PromiseWrap.asyncWrap(async () => {
            /** @type {Object} */
            const validateResult = self.formValidator.validate(query);

            /** @type {string} */
            let requestResult = "";
            if (validateResult.isValid) {
                FormManager.setButtonNotActive();
                FormManager.setInputsDisable(true);
                if (query[EMAIL_INPUT] === "e@e.com") {
                    requestResult = MyFormResultHandler.#extractJsonFrom("ajax-request/error.json");
                } else if (query[FULL_NAME_INPUT] === "progress 1 1") {
                    requestResult = MyFormResultHandler.#extractJsonFrom("ajax-request/progress.json");
                } else {
                    requestResult = MyFormResultHandler.#extractJsonFrom("ajax-request/success.json");
                }
                return await MyFormResultHandler.#fillResultContainer(requestResult);
            }
            FormManager.setErrorMessages(validateResult["errorFields"]);
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
                resultContainer.classList.add(ERROR_CLASS);
            } else if (json["status"] === "progress") {
                resultContainer.append("Loading...");
                resultContainer.classList.add(PROGRESS_CLASS);
                await sleep(parseInt(json["timeout"]));
                return true;
            } else {
                resultContainer.append("Success");
                resultContainer.classList.add(SUCCESS_CLASS);
            }
            return false;
        }, true);
    }


    static #resetResultContainer(resultContainer) {
        let childes = resultContainer.childNodes;
        if (childes.length) {
            childes[0].remove();
        }
        resultContainer.classList.remove(ERROR_CLASS);
        resultContainer.classList.remove(SUCCESS_CLASS);
        resultContainer.classList.remove(PROGRESS_CLASS);
    }
}