/*
    DELETE-PATIENT.JS

    Responsibility:
    Delete a patient using soft delete.
*/


// Get Patient ID from the URL
const deletePatientId =
    new URLSearchParams(
        window.location.search
    ).get("patientId");


// Get the Delete button
const deletePatientButton =
    document.getElementById(
        "deletePatientButton"
    );


// Get all patients
const deletePatients =
    getPatients();


// Find the patient
const deletePatient =
    deletePatients.find(
        function (item) {

            return item.patientId === deletePatientId;

        }
    );


// Handle Delete button click
deletePatientButton.addEventListener(
    "click",
    function () {

        // Check if patient exists
        if (!deletePatient) {

            alert("Patient not found.");

            return;
        }


        // Check if patient is already deleted
        if (deletePatient.deleted) {

            alert(
                "This patient has already been deleted."
            );

            return;
        }


        // Ask the user for confirmation
        const confirmed =
            confirm(
                "Are you sure you want to delete this patient?"
            );


        // Stop if user selected Cancel
        if (!confirmed) {

            return;
        }


        // Soft delete the patient
        deletePatient.deleted = true;


        deletePatient.deletedAt =
            new Date().toISOString();


        deletePatient.deletedBy =
            getCurrentUser();


        // Save the updated patient list
        savePatients(deletePatients);


        // Tell the user
        alert(
            "Patient deleted successfully."
        );


        // Go back to All Patients
        window.location.href =
            "patients.html";

    }
);