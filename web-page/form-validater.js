import {EMAIL_INPUT, FULL_NAME_INPUT, PHONE_INPUT} from "./form-manager.js";

class FormValidater {
    /**
     * @param {Object} formData
     * @return {{isValid: boolean, errorFields: {"my-form__full-name": string, "my-form__email": string, "my-form__phone": string}}}
     */
    static validate(formData) {
        /** @type {{isValid: boolean, errorMessage: string}} */
        const fullNameValidateResult = FormValidater.#validateFullName(formData[FULL_NAME_INPUT]);
        /** @type {{isValid: boolean, errorMessage: string}} */
        const emailValidateResult = FormValidater.#validateEmail(formData[EMAIL_INPUT]);
        /** @type {{isValid: boolean, errorMessage: string}} */
        const phoneValidateResult = FormValidater.#validatePhone(formData[PHONE_INPUT]);
        /** @type {boolean} */
        const isValid = fullNameValidateResult.isValid
            && emailValidateResult.isValid
            && phoneValidateResult.isValid;

        /** @type {Object} */
        let errorFields = {};
        errorFields[FULL_NAME_INPUT] = fullNameValidateResult.errorMessage;
        errorFields[EMAIL_INPUT] = emailValidateResult.errorMessage;
        errorFields[PHONE_INPUT] = phoneValidateResult.errorMessage;
        return {
            isValid: isValid,
            errorFields: errorFields
        };
    }

    /**
     * @param {string} fullName
     * @return {{isValid: boolean, errorMessage: string}}
     */
    static #validateFullName = function (fullName) {
        return {isValid: false, errorMessage: "Error validateFullName"};
    }

    /**
     * @param {string} email
     * @return {{isValid: boolean, errorMessage: string}}
     */
    static #validateEmail = function (email) {
        return {isValid: false, errorMessage: "Error validateEmail"};
    }

    /**
     * @param {string} phone
     * @return {{isValid: boolean, errorMessage: string}}
     */
    static #validatePhone = function (phone) {
        return {isValid: false, errorMessage: "Error validatePhone"};
    }
}

export {FormValidater};