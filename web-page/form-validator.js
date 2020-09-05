import {EMAIL_INPUT, FULL_NAME_INPUT, PHONE_INPUT} from "./form-manager.js";

class FormValidator {
    constructor() {
        /** @private {RegExp} */
        this.nameRegularExpression = new RegExp("[a-zA-Z0-9._-]+ [a-zA-Z0-9._-]+ [a-zA-Z0-9._-]+");
        /** @private {RegExp} */
        this.emailRegularExpression = new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$");
        /** @private {RegExp} */
        this.phoneRegularExpression = new RegExp("([+7]|8)\\d{10}$");
    }
    /**
     * @param {Object} formData
     * @return {{isValid: boolean, errorFields: {"my-form__full-name": string, "my-form__email": string, "my-form__phone": string}}}
     */
    validate(formData) {
        /** @type {{isValid: boolean, errorMessage: string}} */
        const fullNameValidateResult = this.#validateFullName(formData[FULL_NAME_INPUT]);
        /** @type {{isValid: boolean, errorMessage: string}} */
        const emailValidateResult = this.#validateEmail(formData[EMAIL_INPUT]);
        /** @type {{isValid: boolean, errorMessage: string}} */
        const phoneValidateResult = this.#validatePhone(formData[PHONE_INPUT]);
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
    #validateFullName(fullName) {
        return FormValidator.#generateValidateResult(
            fullName,
            this.nameRegularExpression,
            "Must be 3 words"
        );
    }

    /**
     * @param {string} email
     * @return {{isValid: boolean, errorMessage: string}}
     */
    #validateEmail(email) {
        return FormValidator.#generateValidateResult(
            email,
            this.emailRegularExpression,
            "Must be word@word2.wordFrom2to6Letter"
        );
    }

    /**
     * @param {string} phone
     * @return {{isValid: boolean, errorMessage: string}}
     */
    #validatePhone(phone) {
        return FormValidator.#generateValidateResult(
            phone,
            this.phoneRegularExpression,
            "Must be (+7 or 8) and 10 numbers"
        );
    }

    /**
     * @param {string} text
     * @param {RegExp} nameRegularExpression
     * @param {string} errorMessage
     * @return {{isValid: boolean, errorMessage: string}}
     */
    static #generateValidateResult(text, nameRegularExpression, errorMessage) {
        /** @type {boolean} */
        const isValid = nameRegularExpression.test(text);
        /** @type {string} */
        let message = "";
        if (!isValid) {
            message = errorMessage;
        }
        return {isValid: isValid, errorMessage: message};
    }
}

export {FormValidator};