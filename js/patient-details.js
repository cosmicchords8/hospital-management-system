/*
    PATIENT-DETAILS.JS

    Responsibility:
    Display one patient's details.
*/


// Get the Patient ID from the URL
const urlParams =
    new URLSearchParams(
        window.location.search
    );


const patientId =
    urlParams.get("patientId");


// Get the action buttons
const editButton =
    document.getElementById(
        "editPatientButton"
    );


const billButton =
    document.getElementById(
        "createBillButton"
    );


// Get all patients
const patients =
    getPatients();


// Find the patient
const patient =
    patients.find(
        function (patient) {

            return patient.patientId === patientId;

        }
    );


// Find the HTML area where
// the patient details will appear
const patientDetails =
    document.getElementById(
        "patientDetails"
    );


// If the patient doesn't exist
if (!patient) {

    patientDetails.textContent =
        "Patient not found.";

} else {

    /*
        Give the Edit button
        the current patient's ID.
    */
    editButton.href =
        "edit-patient.html?patientId=" +
        patient.patientId;


    /*
        Give the Bill button
        the current patient's ID.
    */
    billButton.href =
        "billing.html?patientId=" +
        patient.patientId;


    /*
        Display the patient.
    */
    patientDetails.innerHTML = `

        <p>
            <strong>Patient ID:</strong>
            ${patient.patientId}
        </p>

        <p>
            <strong>SSN:</strong>
            ${patient.ssn || "Not provided"}
        </p>

        <p>
            <strong>Name:</strong>
            ${patient.firstName}
            ${patient.lastName}
        </p>

        <p>
            <strong>Date of Birth:</strong>
            ${patient.dob}
        </p>

        <p>
            <strong>Gender:</strong>
            ${patient.gender}
        </p>

        <p>
            <strong>Blood Group:</strong>
            ${patient.bloodGroup || "Not provided"}
        </p>

        <p>
            <strong>Height:</strong>
            ${patient.height || "Not provided"}
        </p>

        <p>
            <strong>Weight:</strong>
            ${patient.weight || "Not provided"}
        </p>

        <p>
            <strong>Mobile:</strong>
            ${patient.mobile}
        </p>

        <p>
            <strong>Email:</strong>
            ${patient.email || "Not provided"}
        </p>

        <p>
            <strong>Address:</strong>
            ${patient.address}
        </p>

        <p>
            <strong>City:</strong>
            ${patient.city}
        </p>

        <p>
            <strong>State:</strong>
            ${patient.state}
        </p>

        <p>
            <strong>PIN:</strong>
            ${patient.pin}
        </p>

        <h3>
            Emergency Contact
        </h3>

        <p>
            <strong>Name:</strong>
            ${patient.emergencyContact.name}
        </p>

        <p>
            <strong>Relationship:</strong>
            ${patient.emergencyContact.relationship}
        </p>

        <p>
            <strong>Mobile:</strong>
            ${patient.emergencyContact.mobile}
        </p>

    `;

}