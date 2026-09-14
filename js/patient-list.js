/*
    PATIENT-LIST.JS

    Responsibility:
    Display and search active patients.
*/


// Number of patients shown on one page
const PATIENTS_PER_PAGE = 5;


// Current page
let currentPage = 1;


// Current search text
let searchText = "";


// Get HTML elements
const patientTableBody =
    document.getElementById(
        "patientTableBody"
    );


const activePatientCount =
    document.getElementById(
        "activePatientCount"
    );


const previousButton =
    document.getElementById(
        "previousButton"
    );


const nextButton =
    document.getElementById(
        "nextButton"
    );


const pageInfo =
    document.getElementById(
        "pageInfo"
    );


const patientListMessage =
    document.getElementById(
        "patientListMessage"
    );


const patientSearchInput =
    document.getElementById(
        "patientSearchInput"
    );


const searchPatientButton =
    document.getElementById(
        "searchPatientButton"
    );


const clearSearchButton =
    document.getElementById(
        "clearSearchButton"
    );


// Get all patients
const allPatients =
    getPatients();


// Keep only active patients
const activePatients =
    allPatients.filter(
        function (patient) {

            return !patient.deleted;

        }
    );


// Show active patient count
activePatientCount.textContent =
    activePatients.length;


// Display patients
function displayPatients() {

    // Clear the table
    patientTableBody.innerHTML = "";


    // Find patients matching the search
    const filteredPatients =
        activePatients.filter(
            function (patient) {

                return patient.patientId
                    .toLowerCase()
                    .includes(searchText);

            }
        );


    // If no patients were found
    if (filteredPatients.length === 0) {

        patientListMessage.textContent =
            searchText
                ? "No active patient found."
                : "No active patients found.";

        pageInfo.textContent =
            "Page 0 of 0";

        previousButton.disabled = true;
        nextButton.disabled = true;

        return;
    }


    // Clear message
    patientListMessage.textContent = "";


    // Calculate total pages
    const totalPages =
        Math.ceil(
            filteredPatients.length /
            PATIENTS_PER_PAGE
        );


    // Make sure current page is valid
    if (currentPage > totalPages) {

        currentPage = totalPages;

    }


    // Calculate where this page starts
    const start =
        (currentPage - 1) *
        PATIENTS_PER_PAGE;


    // Calculate where this page ends
    const end =
        start +
        PATIENTS_PER_PAGE;


    // Get patients for this page
    const patientsToDisplay =
        filteredPatients.slice(
            start,
            end
        );


    // Display each patient
    patientsToDisplay.forEach(
        function (patient) {

            const row =
                document.createElement("tr");


            row.innerHTML = `

                <td>
                    ${patient.patientId}
                </td>

                <td>
                    ${patient.firstName}
                    ${patient.lastName}
                </td>

                <td>
                    ${patient.dob}
                </td>

                <td>
                    ${patient.gender}
                </td>

                <td>
                    ${patient.mobile}
                </td>

                <td>
                    ${formatDateTime(patient.createdAt)}
                </td>

                <td>
                    ${patient.updatedAt
                        ? formatDateTime(patient.updatedAt)
                        : "-"}
                </td>

                <td>
                    ${patient.createdBy || "-"}
                </td>

                <td>
                    ${patient.updatedBy || "-"}
                </td>

                <td>
                    <a href="patient-details.html?patientId=${patient.patientId}">
                        Open
                    </a>
                </td>

                

            `;


            patientTableBody.appendChild(row);

        }
    );


    // Show page information
    pageInfo.textContent =
        "Page " +
        currentPage +
        " of " +
        totalPages;


    // Enable/disable Previous
    previousButton.disabled =
        currentPage === 1;


    // Enable/disable Next
    nextButton.disabled =
        currentPage === totalPages;

}


// Search button
searchPatientButton.addEventListener(
    "click",
    function () {

        searchText =
            patientSearchInput.value
                .trim()
                .toLowerCase();


        // Start search results from page 1
        currentPage = 1;


        displayPatients();

    }
);


// Press Enter to search
patientSearchInput.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {

            searchPatientButton.click();

        }

    }
);


// Clear search
clearSearchButton.addEventListener(
    "click",
    function () {

        patientSearchInput.value = "";

        searchText = "";

        currentPage = 1;

        displayPatients();

    }
);


// Previous button
previousButton.addEventListener(
    "click",
    function () {

        if (currentPage > 1) {

            currentPage--;

            displayPatients();

        }

    }
);


// Next button
nextButton.addEventListener(
    "click",
    function () {

        const filteredPatients =
            activePatients.filter(
                function (patient) {

                    return patient.patientId
                        .toLowerCase()
                        .includes(searchText);

                }
            );


        const totalPages =
            Math.ceil(
                filteredPatients.length /
                PATIENTS_PER_PAGE
            );


        if (currentPage < totalPages) {

            currentPage++;

            displayPatients();

        }

    }
);


// Format date/time
function formatDateTime(dateTime) {

    if (!dateTime) {

        return "-";

    }


    const date =
        new Date(dateTime);


    return date.toLocaleString();

}


// Display first page
displayPatients();