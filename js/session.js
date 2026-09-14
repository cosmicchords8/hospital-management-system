/*
    SESSION.JS

    Responsibility:
    Manage the current user's login session.

    This file does NOT:
    - check passwords
    - display the login form
    - handle patient data
    - handle billing

    Its only responsibility is session management.
*/


/*
    The session will last for 15 minutes.

    We use milliseconds because JavaScript's Date/time
    calculations work with milliseconds.
*/
const SESSION_DURATION_MINUTES = 15;


/*
    Create a session for the logged-in user.
*/
function createSession(userId) {

    const currentTime = new Date();

    /*
        Calculate when the session should expire.

        15 minutes × 60 seconds × 1000 milliseconds
    */
    const expiryTime = new Date(
        currentTime.getTime() +
        SESSION_DURATION_MINUTES * 60 * 1000
    );


    /*
        Store the session information in an object.
    */
    const session = {
        userId: userId,
        loginTime: currentTime.toISOString(),
        expiresAt: expiryTime.toISOString()
    };


    /*
        sessionStorage stores data only for the browser session.

        Objects cannot be stored directly, so we convert
        the object into a JSON string.
    */
    sessionStorage.setItem(
        "session",
        JSON.stringify(session)
    );


    /*
        Store the current user's ID separately.

        This makes it easy for other pages to ask:
        "Who is currently logged in?"
    */
    sessionStorage.setItem(
        "currentUser",
        userId
    );
}


/*
    Get the current session.
*/
function getSession() {

    const sessionData =
        sessionStorage.getItem("session");


    /*
        If there is no session, return null.
    */
    if (!sessionData) {
        return null;
    }


    /*
        Convert the JSON string back into a JavaScript object.
    */
    return JSON.parse(sessionData);
}


/*
    Check whether the user currently has
    a valid session.
*/
function isSessionValid() {

    const session = getSession();


    /*
        No session means the user is not logged in.
    */
    if (!session) {
        return false;
    }


    /*
        Convert the stored expiry time into a Date object.
    */
    const expiryTime =
        new Date(session.expiresAt);


    /*
        Compare the expiry time with the current time.
    */
    if (new Date() >= expiryTime) {

        logout();

        return false;
    }


    return true;
}


/*
    Get the ID of the currently logged-in user.
*/
function getCurrentUser() {

    return sessionStorage.getItem("currentUser");
}


/*
    Logout

    Remove all session information.
*/
function logout() {

    sessionStorage.removeItem("session");
    sessionStorage.removeItem("currentUser");
}