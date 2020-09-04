const FULL_NAME_INPUT = "my-form__full-name";
const EMAIL_INPUT = "my-form__email";
const PHONE_INPUT = "my-form__phone";

class FormManager {
    static getFormData() {
        let fullNameInput = $("input[name=\"" + FULL_NAME_INPUT + "\"]")[0];
        let emailInput = $("input[name=\"" + EMAIL_INPUT + "\"]")[0];
        let phoneInput = $("input[name=\"" + PHONE_INPUT + "\"]")[0];

        let result = {};
        result[FULL_NAME_INPUT] = fullNameInput.textContent;
        result[EMAIL_INPUT] = emailInput.textContent;
        result[PHONE_INPUT] = phoneInput.textContent;
        return result;
    }

    /**
     * @param {Object} data
     */
    static setFormData(data) {
        let fullNameInput = $("input[name=\"" + FULL_NAME_INPUT + "\"]")[0];
        fullNameInput.setAttribute("value", data[FULL_NAME_INPUT]);
        let emailInput =$("input[name=\"" + EMAIL_INPUT + "\"]")[0];
        emailInput.setAttribute("value", data[EMAIL_INPUT]);
        let phoneInput = $("input[name=\"" + PHONE_INPUT + "\"]")[0];
        phoneInput.setAttribute("value", data[PHONE_INPUT]);
    }

    /**
     * @param {Object} data
     */
    static setErrorMessages(data) {
        let fullNameLabel = $("label[name=\"" + FULL_NAME_INPUT + "-label\"]")[0];
        FormManager.#replaceLabelText(fullNameLabel, data[FULL_NAME_INPUT]);
        let emailLabel = $("label[name=\"" + EMAIL_INPUT + "-label\"]")[0];
        FormManager.#replaceLabelText(emailLabel, data[EMAIL_INPUT]);
        let phoneLabel = $("label[name=\"" + PHONE_INPUT + "-label\"]")[0];
        FormManager.#replaceLabelText(phoneLabel, data[PHONE_INPUT]);
    }

    /**
     *
     * @param {HTMLLabelElement} label
     * @param {string} text
     */
    static #replaceLabelText = function (label, text) {
        let childes = label.childNodes;
        if (childes.length) {
            childes[0].remove();
        }
        label.append(text);
    }
}

export {FormManager, FULL_NAME_INPUT, EMAIL_INPUT, PHONE_INPUT}