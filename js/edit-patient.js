// Get patient ID from the URL
const urlParams = new URLSearchParams(window.location.search);

const patientId = urlParams.get("patientId");


// Get the patient list
const patients = getPatients();


// Find the patient we want to edit
const patient = patients.find(
    function (item) {
        return item.patientId === patientId;
    }
);


// Get the form
const editPatientForm =
    document.getElementById("editPatientForm");


// Get the message area
const editPatientMessage =
    document.getElementById("editPatientMessage");


// If patient was not found
if (!patient) {

    editPatientMessage.textContent =
        "Patient not found.";

} else {

    // Put existing patient data into the form

    document.getElementById("patientId").value =
        patient.patientId;

    document.getElementById("ssn").value =
        patient.ssn || "";

    document.getElementById("firstName").value =
        patient.firstName;

    document.getElementById("lastName").value =
        patient.lastName;

    document.getElementById("dob").value =
        patient.dob;

    document.getElementById("gender").value =
        patient.gender;

    document.getElementById("bloodGroup").value =
        patient.bloodGroup || "";

    document.getElementById("height").value =
        patient.height || "";

    document.getElementById("weight").value =
        patient.weight || "";

    document.getElementById("mobile").value =
        patient.mobile;

    document.getElementById("email").value =
        patient.email || "";

    document.getElementById("address").value =
        patient.address;

    document.getElementById("city").value =
        patient.city;

    document.getElementById("state").value =
        patient.state;

    document.getElementById("pin").value =
        patient.pin;

    document.getElementById("emergencyName").value =
        patient.emergencyContact.name;

    document.getElementById("emergencyRelationship").value =
        patient.emergencyContact.relationship;

    document.getElementById("emergencyMobile").value =
        patient.emergencyContact.mobile;
}


// Handle Save Changes
editPatientForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        // Stop if patient does not exist
        if (!patient) {
            return;
        }


        // Read editable values
        const firstName =
            document.getElementById("firstName").value.trim();

        const lastName =
            document.getElementById("lastName").value.trim();

        const dob =
            document.getElementById("dob").value;

        const gender =
            document.getElementById("gender").value;

        const bloodGroup =
            document.getElementById("bloodGroup").value;

        const height =
            document.getElementById("height").value;

        const weight =
            document.getElementById("weight").value;

        const mobile =
            document.getElementById("mobile").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const address =
            document.getElementById("address").value.trim();

        const city =
            document.getElementById("city").value.trim();

        const state =
            document.getElementById("state").value.trim();

        const pin =
            document.getElementById("pin").value.trim();

        const emergencyName =
            document.getElementById("emergencyName").value.trim();

        const emergencyRelationship =
            document.getElementById("emergencyRelationship").value.trim();

        const emergencyMobile =
            document.getElementById("emergencyMobile").value.trim();


        // Validate required fields
        if (!isValidName(firstName)) {

            editPatientMessage.textContent =
                "Please enter a valid first name.";

            editPatientMessage.className =
                "error-message";

            return;
        }


        if (!isValidName(lastName)) {

            editPatientMessage.textContent =
                "Please enter a valid last name.";

            editPatientMessage.className =
                "error-message";

            return;
        }


        if (!isValidDateOfBirth(dob)) {

            editPatientMessage.textContent =
                "Please enter a valid date of birth.";

            editPatientMessage.className =
                "error-message";

            return;
        }


        if (!gender) {

            editPatientMessage.textContent =
                "Please select a gender.";

            editPatientMessage.className =
                "error-message";

            return;
        }


        if (!isValidMeasurement(height)) {

            editPatientMessage.textContent =
                "Height must be greater than 0.";

            editPatientMessage.className =
                "error-message";

            return;
        }


        if (!isValidMeasurement(weight)) {

            editPatientMessage.textContent =
                "Weight must be greater than 0.";

            editPatientMessage.className =
                "error-message";

            return;
        }


        if (!isValidMobile(mobile)) {

            editPatientMessage.textContent =
                "Mobile number must contain 10 digits.";

            editPatientMessage.className =
                "error-message";

            return;
        }


        if (!isValidPin(pin)) {

            editPatientMessage.textContent =
                "PIN must contain 6 digits.";

            editPatientMessage.className =
                "error-message";

            return;
        }


        if (!isValidName(emergencyName)) {

            editPatientMessage.textContent =
                "Please enter a valid emergency contact name.";

            editPatientMessage.className =
                "error-message";

            return;
        }


        if (!isValidMobile(emergencyMobile)) {

            editPatientMessage.textContent =
                "Emergency mobile number must contain 10 digits.";

            editPatientMessage.className =
                "error-message";

            return;
        }


        // Update only editable patient information
        patient.firstName = firstName;
        patient.lastName = lastName;
        patient.dob = dob;
        patient.gender = gender;
        patient.bloodGroup = bloodGroup;
        patient.height = height;
        patient.weight = weight;
        patient.mobile = mobile;
        patient.email = email;
        patient.address = address;
        patient.city = city;
        patient.state = state;
        patient.pin = pin;

        patient.emergencyContact = {
            name: emergencyName,
            relationship: emergencyRelationship,
            mobile: emergencyMobile
        };


        // Save update information
        patient.updatedAt =
            new Date().toISOString();

        patient.updatedBy =
            getCurrentUser();


        // Save the complete patient list
        savePatients(patients);


        // Show success message
        editPatientMessage.textContent =
            "Patient updated successfully.";

        editPatientMessage.className =
            "success-message";

    }
);