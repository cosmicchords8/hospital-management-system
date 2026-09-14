/*
    PATIENT-DATA.JS

    Responsibility:
    Manage patient data.

    This file does NOT:
    - display forms
    - validate form fields
    - handle buttons
    - create HTML
*/


/*
    Name of the localStorage entry
    where patient records are stored.
*/
const PATIENT_STORAGE_KEY =
    "patients";


/*
    Get all patients.
*/
function getPatients() {

    const data =
        localStorage.getItem(
            PATIENT_STORAGE_KEY
        );


    /*
        If no patients exist yet,
        return an empty array.
    */
    if (!data) {
        return [];
    }


    /*
        Convert JSON text back into
        a JavaScript array.
    */
    return JSON.parse(data);
}


/*
    Save all patients.
*/
function savePatients(patients) {

    localStorage.setItem(
        PATIENT_STORAGE_KEY,
        JSON.stringify(patients)
    );
}


/*
    Generate the next Patient ID.
*/
function generatePatientId() {

    const patients =
        getPatients();


    const nextNumber =
        patients.length + 1;


    return "PAT-" +
        String(nextNumber).padStart(6, "0");
}


/*
    Add a new patient.
*/
function addPatient(patient) {

    const patients =
        getPatients();


    patients.push(patient);


    savePatients(patients);
}