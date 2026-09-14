/*
    DASHBOARD.JS

    Responsibility:
    Protect the dashboard page.

    This file does NOT:
    - create the header
    - create the sidebar
    - create the footer
    - handle logout
*/


/*
    Check whether the user has a valid session.
*/
if (!isSessionValid()) {

    /*
        No valid session exists.

        Return to login.
    */
    window.location.href =
        "index.html";
}