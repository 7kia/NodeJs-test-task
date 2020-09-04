import {FormValidater} from "./form-validater.js";
import {FormManager} from "./form-manager.js";

$(document).ready(function() {
    $( "#submitButton" ).click(function() {
        const validateResult = FormValidater.validate(FormManager.getFormData());
        FormManager.setErrorMessages(validateResult["errorFields"]);
    });
});