import {EMAIL_INPUT, FormManager, PHONE_INPUT} from "./form-manager.js";
import {MyFormResultHandler} from "./my-form-result-handler.js";
import {FULL_NAME_INPUT} from "./form-manager.js";

/**
 *
 * @return {Object}
 */
function getUrlVars()
{
    let vars = {};
    const hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(let i = 0; i < hashes.length; i++)
    {
        const hash = hashes[i].split('=');
        vars[hash[0]] = hash[1];
    }
    return vars;
}

$(document).ready(async function() {
    /** @type {Object} */
    const query = getUrlVars();
    /** @type {boolean} */
    const isFormRequest = query.hasOwnProperty(FULL_NAME_INPUT)
        && query.hasOwnProperty(EMAIL_INPUT)
        && query.hasOwnProperty(PHONE_INPUT);
    if (isFormRequest) {
        FormManager.setFormData(query);
        if (await MyFormResultHandler.handle(query)) {
            let resultContainer = $("#my-form")[0];
            resultContainer.submit();
        }
    }

    $("#submitButton").click(function() {

    });
});