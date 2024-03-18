import { USER_LOGIN_INFO } from "../../js/constants.js";
import { redirect } from "../../js/functions.js";

const formValidators = {
    name: {
        required: true,
        maxLength: 12,
    },
    surname: {
        required: true,
    },
    email: {
        required: true,
        structure: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
    },
    details: {
        required: true,
    },
}

function validate(validator, inputValue) {
    for (const key in validator) {
        switch (key) {
            case "required":
                if (inputValue === "" || inputValue === undefined || inputValue === null) {
                    return "Obavezan unos!"
                }
                break;
            case "maxLength":
                if (inputValue.length > validator[key]) {
                    return `Maksimalna dužina je ${validator[key]}!`
                }
                break;
            case "structure":
                if (!inputValue.toLowerCase().match(validator[key])) {
                    return "Neispravan unos!"
                }
                break;
        }
    }

    return ""
}

function validateInput(inputName) {
    const inputElement = document.getElementById(inputName)
    const errorElement = inputElement.nextElementSibling
    const error = validate(formValidators[inputName], inputElement.value)

    errorElement.innerHTML = error

    if (error) {
        inputElement.classList.add("input-invalid")
    } else {
        inputElement.classList.remove("input-invalid")
    }
}

function validateForm(event) {
    event.preventDefault()

    Object.keys(formValidators).forEach(validateInput)

    const errorExists = !!document.getElementsByClassName("input-invalid").length

    if (!errorExists) {
        const inputData = Object.fromEntries(new FormData(event.target))

        localStorage.setItem(USER_LOGIN_INFO, JSON.stringify(inputData))
        redirect("/pages/overview/index.html")
    }
}

function guard() {
    const userInfo = localStorage.getItem(USER_LOGIN_INFO)

    if (userInfo) {
        redirect("/pages/overview/index.html")
    }
}

guard()

const formElement = document.getElementById("input-form")
formElement.addEventListener("submit", validateForm)