import {EMAIL_INPUT, FormManager, PHONE_INPUT} from "./js/form-manager.js";
import {MyFormResultHandler} from "./js/my-form-result-handler.js";
import {FULL_NAME_INPUT} from "./js/form-manager.js";

/**
 *
 * @return {Object}
 */
function getUrlVars()
{
    let vars = {};
    const paramsString = window.location.href.slice(window.location.href.indexOf('?') + 1);
    const searchParams = new URLSearchParams(paramsString);
    for(let param of searchParams)
    {
        vars[param[0]] = param[1];
    }
    return vars;
}

$(document).ready(async function() {
    /** @type {MyFormResultHandler} */
    const myFormResultHandler = new MyFormResultHandler();
    /** @type {Object} */
    const query = getUrlVars();

    /** @type {boolean} */
    const isFormRequest = query.hasOwnProperty(FULL_NAME_INPUT)
        && query.hasOwnProperty(EMAIL_INPUT)
        && query.hasOwnProperty(PHONE_INPUT);
    if (isFormRequest) {
        FormManager.setFormData(query);
        if (await myFormResultHandler.handle(query)) {
            window.location.reload(true);
        }
    }
});