/*
    VALIDATION.JS

    Responsibility:
    Provide reusable validation functions.

    This file does NOT:
    - handle login
    - create accounts
    - manage sessions
    - manipulate patient data

    It only answers questions such as:

    "Is this User ID valid?"
    "Is this password valid?"
*/


/*
    Validate a User ID.

    Rules:
    - At least 8 characters
    - Only letters and numbers
*/
function isValidUserId(userId) {

    return (
        userId.length >= 8 &&
        /^[A-Za-z0-9]+$/.test(userId)
    );
}


/*
    Validate a password.

    Rules:
    - At least 10 characters
    - At least one uppercase letter
    - At least one lowercase letter
    - At least one number
    - At least one special character
*/
function isValidPassword(password) {

    return (
        password.length >= 10 &&
        /[A-Z]/.test(password) &&
        /[a-z]/.test(password) &&
        /[0-9]/.test(password) &&
        /[^A-Za-z0-9]/.test(password)
    );
}


/*
    ================================
    PATIENT VALIDATION
    ================================
*/


/*
    Check whether a name is valid.
*/
function isValidName(name) {

    return (
        name.trim().length > 0 &&
        /^[A-Za-z ]+$/.test(name.trim())
    );
}


/*
    Check whether a mobile number is valid.
*/
function isValidMobile(mobile) {

    return /^[0-9]{10}$/.test(
        mobile.trim()
    );
}


/*
    Check whether a PIN is valid.
*/
function isValidPin(pin) {

    return /^[0-9]{6}$/.test(
        pin.trim()
    );
}


/*
    Check whether a date of birth is valid.
*/
function isValidDateOfBirth(dob) {

    if (!dob) {
        return false;
    }


    const selectedDate =
        new Date(dob);

    const today =
        new Date();


    /*
        Remove the time portion
        from today's date.
    */
    today.setHours(
        0,
        0,
        0,
        0
    );


    /*
        Date of birth cannot
        be in the future.
    */
    return selectedDate <= today;
}


/*
    Check whether a physical measurement
    is greater than zero.
*/
function isValidMeasurement(value) {

    if (value === "") {
        return true;
    }


    return Number(value) > 0;
}

