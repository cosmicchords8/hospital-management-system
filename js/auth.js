const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");

loginForm.addEventListener("submit", function (event) {
  event.preventDefault();

  // Check whether the account is currently locked.
  if (isLoginLocked()) {
    startLockoutCountdown();
    return;
  }

  const userId = document.getElementById("userId").value.trim();
  const password = document.getElementById("password").value;

  loginMessage.className =
    "error-message";

  // Validate User ID.
  if (!isValidUserId(userId)) {
    loginMessage.textContent =
      "User ID must be at least 8 characters and contain only letters or numbers.";
    return;
  }

  // Validate Password.
  if (!isValidPassword(password)) {
    loginMessage.textContent =
      "Password must be at least 10 characters and contain uppercase, lowercase, number, and special character.";
    return;
  }

  // Find the user in our demo user data.
  const user = findUserById(userId);

  // Check whether the password matches.
  if (user && user.password === password) {

    // Successful login resets failed attempts.
    resetLoginAttempts();

    // Create the user's session.
    createSession(userId);

    loginMessage.className =
    "success-message";

    loginMessage.textContent =
        "Login successful.";


    /*
        Give the user a moment to see
        the success message before redirecting.
    */
    setTimeout(function () {

        window.location.href =
            "dashboard.html";

    }, 500);



    // Dashboard redirect will be added later.
  } else {

    // Wrong credentials.
    recordFailedLogin();

    if (isLoginLocked()) {
      startLockoutCountdown();
    } else {
      loginMessage.textContent =
        "Invalid User ID or password. " +
        getRemainingAttempts() +
        " attempts remaining.";
    }
  }
});


/*
 * Shows the remaining lockout time.
 */
function startLockoutCountdown() {

  // Stop an existing countdown first.
  if (window.lockoutTimer) {
    clearInterval(window.lockoutTimer);
  }

  function updateCountdown() {

    const lockoutEndTime = getLockoutEndTime();

    // No lockout exists.
    if (!lockoutEndTime) {
      clearInterval(window.lockoutTimer);
      window.lockoutTimer = null;

      loginMessage.textContent =
        "You can try logging in again.";

      return;
    }

    // Calculate remaining milliseconds.
    const remainingMilliseconds =
      Number(lockoutEndTime) - Date.now();

    // Convert milliseconds to seconds.
    const remainingSeconds =
      Math.ceil(remainingMilliseconds / 1000);

    // Lockout has finished.
    if (remainingSeconds <= 0) {
      clearInterval(window.lockoutTimer);
      window.lockoutTimer = null;

      resetLoginAttempts();

      loginMessage.textContent =
        "Lockout ended. You can try logging in again.";

      return;
    }

    loginMessage.textContent =
      "Too many failed attempts. Try again in " +
      remainingSeconds +
      " seconds.";
  }

  // Run immediately.
  updateCountdown();

  // Then update every second.
  window.lockoutTimer =
    setInterval(updateCountdown, 1000);
}


