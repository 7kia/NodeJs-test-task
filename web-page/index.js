/**
 *
 * @return {{
 *      isValid: boolean,
 *      errorFields: {
 *          "my-form__full-name": string,
 *          "my-form__email": string,
 *          "my-form__phone": string
 *      }
 * }}
 */
function validate() {
    return {
        isValid: false,
        errorFields: {
            "my-form__full-name": "error1",
            "my-form__email": "error2",
            "my-form__phone": "error3",
        }
    }
}

function getFormData() {
    let fullNameInput = $("input[name=\"my-form__full-name\"]")[0];
    let emailInput = $("input[name=\"my-form__email\"]")[0];
    let phoneInput = $("input[name=\"my-form__phone\"]")[0];

    return {
        "my-form__full-name": fullNameInput.textContent,
        "my-form__email": emailInput.textContent,
        "my-form__phone": phoneInput.textContent,
    }
}

/**
 * @param {Object} data
 */
function setFormData(data) {
    let fullNameInput = $("input[name=\"my-form__full-name\"]")[0];
    fullNameInput.setAttribute("value", data["my-form__full-name"]);
    let emailInput = $("input[name=\"my-form__email\"]")[0];
    emailInput.setAttribute("value", data["my-form__email"]);
    let phoneInput = $("input[name=\"my-form__phone\"]")[0];
    phoneInput.setAttribute("value", data["my-form__phone"]);
}

/**
 * @param {Object} data
 */
function setErrorMessages(data) {
    let fullNameLabel = $("label[name=\"my-form__full-name-label\"]")[0];
    replaceLabelText(fullNameLabel, data["my-form__full-name"]);
    let emailLabel = $("label[name=\"my-form__email-label\"]")[0];
    replaceLabelText(emailLabel, data["my-form__email"]);
    let phoneLabel = $("label[name=\"my-form__phone-label\"]")[0];
    replaceLabelText(phoneLabel, data["my-form__phone"]);
}

function replaceLabelText(label, text) {
    let childes = label.childNodes;
    if (childes.length) {
        childes[0].remove();
    }
    label.append(text);
}

$(document).ready(function() {
    $( "#submitButton" ).click(function() {
        validate();
    });

    console.log(getFormData());
    setFormData(
        validate().errorFields
    )
    setErrorMessages(
        validate().errorFields
    )
    console.log( "ready!" );
});