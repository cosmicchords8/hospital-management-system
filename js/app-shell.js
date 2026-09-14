/*
    APP-SHELL.JS

    Responsibility:
    Create and control the common application shell.

    This includes:
    - Header
    - Sidebar
    - Footer
    - Sidebar collapse
    - Logout button
*/


/*
    Create the application header.
*/
function createHeader() {

    const header =
        document.getElementById("appHeader");

    const currentUser =
        getCurrentUser();

    header.innerHTML = `

        <h1>
            Hospital Management System
        </h1>

        <div>

            <span>
                ${currentUser}
            </span>

            <span>
                |
            </span>

            <span>
                Session:
                <span id="sessionCountdown">
                    15:00
                </span>
            </span>

            <button
                type="button"
                id="logoutButton"
            >
                Logout
            </button>

        </div>

       

    `;
}


/*
    Create the application sidebar.
*/
function createSidebar() {

    const sidebar =
        document.getElementById("sidebar");

    sidebar.innerHTML = `

        <button
            type="button"
            id="sidebarToggle"
            class="sidebar-toggle"
        >
            ☰
        </button>


        <a href="dashboard.html">
            Dashboard
        </a>


        <div class="sidebar-section">

            <strong>
                Patients
            </strong>

            <a href="patients.html">
                All Patients
            </a>

            <a href="new-patient.html">
                New Patient
            </a>

        </div>


        <div class="sidebar-section">

            <strong>
                Billing
            </strong>

            <a href="bills.html">
                All Bills
            </a>

            <a href="billing.html">
                Create Bill
            </a>

        </div>


        <a href="activity-log.html">
            Activity Log
        </a>

    `;
}


/*
    Create the application footer.
*/
function createFooter() {

    const footer =
        document.getElementById("appFooter");

    footer.innerHTML = `

        <div class="footer-section">

            <strong>
                TCS Confidential
            </strong>

        </div>


        <div class="footer-section">

            <strong>
                Connect with us
            </strong>

            <div>

                <a href="#">
                    LinkedIn
                </a>

                |

                <a href="#">
                    Website
                </a>

            </div>

        </div>


        <div class="footer-section">

            <strong>
                Location
            </strong>

            <div>
                Hospital Location
            </div>

        </div>


        <div class="footer-section">

            <strong>
                Contact
            </strong>

            <div>
                Contact Information
            </div>

        </div>

    `;
}


/*
    Enable sidebar collapse/expand.
*/
function setupSidebarToggle() {

    const sidebar =
        document.getElementById("sidebar");

    const sidebarToggle =
        document.getElementById("sidebarToggle");


    sidebarToggle.addEventListener(
        "click",
        function () {

            sidebar.classList.toggle(
                "collapsed"
            );

        }
    );
}


/*
    Enable logout.
*/
function setupLogout() {

    const logoutButton =
        document.getElementById("logoutButton");


    logoutButton.addEventListener(
        "click",
        function () {

            logout();

            window.location.href =
                "index.html";

        }
    );
}


// hospital/js/app-shell.js

/*
    Show the remaining session time.
*/

function setupSessionCountdown() {

    const countdown =
        document.getElementById(
            "sessionCountdown"
        );


    function updateCountdown() {

        const session =
            getSession();


        if (!session) {

            countdown.textContent =
                "00:00";

            return;
        }


        const expiryTime =
            new Date(
                session.expiresAt
            ).getTime();


        const currentTime =
            new Date().getTime();


        const remainingTime =
            expiryTime -
            currentTime;


        if (remainingTime <= 0) {

            countdown.textContent =
                "00:00";

            logout();

            window.location.href =
                "index.html";

            return;
        }


        const totalSeconds =
            Math.floor(
                remainingTime / 1000
            );


        const minutes =
            Math.floor(
                totalSeconds / 60
            );


        const seconds =
            totalSeconds % 60;


        countdown.textContent =
            String(minutes).padStart(2, "0") +
            ":" +
            String(seconds).padStart(2, "0");

    }


    updateCountdown();


    setInterval(
        updateCountdown,
        1000
    );

}



/*
    Build the common shell.
*/
createHeader();

createSidebar();

createFooter();

setupSidebarToggle();

setupLogout();

setupSessionCountdown();


