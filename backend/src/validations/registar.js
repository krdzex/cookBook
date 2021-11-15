import Validator from "validator";
import isEmpty from "is-empty";

module.exports = function validateEdit(data) {
    let errors = {}

    data.userName = !isEmpty(data.userName) ? data.userName : ""
    data.email = !isEmpty(data.email) ? data.email : ""
    data.password = !isEmpty(data.password) ? data.password : ""
    data.confirmPassword = !isEmpty(data.confirmPassword) ? data.confirmPassword : ""

    if (Validator.isEmpty(data.userName)) {
        errors.userName = "Username is required";
    }
    if (!Validator.isLength(data.userName, { max: 10 })) {
        errors.userName = "Username is longer then 10 characters";
    }
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email is required";
    }
    if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }
    if (!Validator.matches(data.userName, /^[a-zA-Z0-9\s]*$/)) {
        errors.userName = "No special characters allowed";
    }
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password is required";
    }
    if (!Validator.equals(data.password, data.confirmPassword)) {
        errors.confirmPassword = "Passwords are not same";
    }
    if (Validator.isEmpty(data.confirmPassword)) {
        errors.confirmPassword = "Confirm password is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }

}