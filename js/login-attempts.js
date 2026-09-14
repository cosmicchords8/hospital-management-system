/*
    LOGIN-ATTEMPTS.JS

    Responsibility:
    Manage failed login attempts and temporary lockout.

    This file does NOT:
    - authenticate passwords
    - create users
    - create sessions
    - display the login form
*/


/*
    Maximum number of failed login attempts
    before the user is temporarily locked.
*/
const MAX_LOGIN_ATTEMPTS = 3;


/*
    How long the lockout lasts.

    We are using 1 minute for easy testing.

    Later this could be changed to:
    5
    10
    etc.
*/
const LOCKOUT_DURATION_MINUTES = 1;


/*
    Get the login-attempt information.

    We store this in localStorage so that it
    survives a page refresh.
*/
function getLoginAttempts() {

    const data =
        localStorage.getItem("loginAttempts");


    /*
        If no attempt information exists yet,
        return a fresh object.
    */
    if (!data) {

        return {
            failedAttempts: 0,
            lockedUntil: null
        };
    }


    /*
        Convert stored JSON back into an object.
    */
    return JSON.parse(data);
}


/*
    Save login-attempt information.
*/
function saveLoginAttempts(loginAttempts) {

    localStorage.setItem(
        "loginAttempts",
        JSON.stringify(loginAttempts)
    );
}


/*
    Record one failed login attempt.
*/
function recordFailedLogin() {
    const loginAttempts =
        getLoginAttempts();


    /*
        Increase the failed attempt count.
    */
    loginAttempts.failedAttempts++;


    /*
        If the maximum number of attempts
        has been reached, start the lockout.
    */
    if (
        loginAttempts.failedAttempts >=
        MAX_LOGIN_ATTEMPTS
    ) {

        const currentTime = new Date();

        const lockoutEndTime =
            new Date(
                currentTime.getTime() +
                LOCKOUT_DURATION_MINUTES * 60 * 1000
            );


        loginAttempts.lockedUntil =
            lockoutEndTime.toISOString();
    }


    /*
        Save the updated information.
    */
    saveLoginAttempts(loginAttempts);
}


/*
    Check whether login is currently locked.
*/
function isLoginLocked() {

    const loginAttempts =
        getLoginAttempts();


    /*
        If there is no lockout timestamp,
        the login is not locked.
    */
    if (!loginAttempts.lockedUntil) {
        return false;
    }


    const currentTime = new Date();

    const lockedUntil =
        new Date(loginAttempts.lockedUntil);


    /*
        If the current time is still before
        the lockout expiry time, remain locked.
    */
    if (currentTime < lockedUntil) {
        return true;
    }


    /*
        The lockout has expired.

        Reset the failed attempts.
    */
    resetLoginAttempts();

    return false;
}


/*
    Get how many attempts remain.
*/
function getRemainingAttempts() {

    const loginAttempts =
        getLoginAttempts();


    return Math.max(
        0,
        MAX_LOGIN_ATTEMPTS -
        loginAttempts.failedAttempts
    );
}


/*
    Get the lockout expiry time.
*/
function getLockoutEndTime() {

    const loginAttempts =
        getLoginAttempts();

    /*
        If there is no lockout,
        return null.
    */
    if (!loginAttempts.lockedUntil) {
        return null;
    }

    /*
        Convert the stored ISO date string
        into a timestamp number.
    */
    return new Date(
        loginAttempts.lockedUntil
    ).getTime();
}


/*
    Reset failed attempts.

    This is used after:
    - successful login
    - lockout expiry
*/
function resetLoginAttempts() {

    localStorage.removeItem(
        "loginAttempts"
    );
}