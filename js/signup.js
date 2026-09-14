/*
    SIGNUP.JS

    Responsibility:
    Handle creation of a new user account.

    It does NOT:
    - manage sessions
    - authenticate existing users
    - define validation rules
    - directly manage localStorage
*/


const signupForm =
    document.getElementById("signupForm");

const signupMessage =
    document.getElementById("signupMessage");


signupForm.addEventListener("submit", function (event) {

    event.preventDefault();


    /*
        Get values from the form.
    */
    const userId =
        document.getElementById("signupUserId")
            .value
            .trim();

    const password =
        document.getElementById("signupPassword")
            .value;

    const confirmPassword =
        document.getElementById("confirmPassword")
            .value;


    /*
        Clear previous message.
    */
    signupMessage.textContent = "";
    signupMessage.style.color = "#d32f2f";


    /*
        Use our shared User ID validation.
    */
    if (!isValidUserId(userId)) {

        signupMessage.textContent =
            "User ID must be at least 8 characters and contain only letters and numbers.";

        return;
    }


    /*
        Use our shared password validation.
    */
    if (!isValidPassword(password)) {

        signupMessage.textContent =
            "Password must be at least 10 characters and contain uppercase, lowercase, number and special character.";

        return;
    }


    /*
        Check that both password fields match.
    */
    if (password !== confirmPassword) {

        signupMessage.textContent =
            "Passwords do not match.";

        return;
    }


    /*
        Check whether the User ID already exists.
    */
    const existingUser =
        findUserById(userId);


    if (existingUser) {

        signupMessage.textContent =
            "This User ID already exists.";

        return;
    }


    /*
        Create the new user object.
    */
    const newUser = {
        userId: userId,
        password: password
    };


    /*
        Ask user-data.js to store the account.
    */
    addUser(newUser);


    /*
        Tell the user that account creation succeeded.
    */
    signupMessage.style.color = "green";

    signupMessage.textContent =
        "Account created successfully. You can now login.";


    /*
        Clear the form.
    */
    signupForm.reset();

});