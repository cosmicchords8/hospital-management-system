/*
    USER-DATA.JS

    Responsibility:
    Store and retrieve user accounts.

    This file does NOT:
    - display the login form
    - authenticate passwords
    - create sessions

    It only manages user data.
*/


/*
    These are our initial demo users.

    They are only used the first time the application
    is opened and no users have been stored yet.
*/
const DEFAULT_USERS = [
    {
        userId: "admission01",
        password: "Hospital@1"
    },
    {
        userId: "admission02",
        password: "Hospital@2"
    },
    {
        userId: "admin1234",
        password: "Admin@1234"
    }
];


/*
    Get all users from localStorage.
*/
function getUsers() {

    const userData =
        localStorage.getItem("users");


    /*
        If users don't exist yet, create our
        initial demo users.
    */
    if (!userData) {

        localStorage.setItem(
            "users",
            JSON.stringify(DEFAULT_USERS)
        );

        return DEFAULT_USERS;
    }


    /*
        Convert the stored JSON string back
        into a JavaScript array.
    */
    return JSON.parse(userData);
}


/*
    Save the complete users array.
*/
function saveUsers(users) {

    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );
}


/*
    Find one user by user ID.
*/
function findUserById(userId) {

    const users = getUsers();

    return users.find(function (user) {
        return user.userId === userId;
    });
}


/*
    Add a new user.
*/
function addUser(user) {

    const users = getUsers();

    users.push(user);

    saveUsers(users);
}