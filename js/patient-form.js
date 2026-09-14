/*
    PATIENT-FORM.JS

    Responsibility:
    Handle behavior specific to the
    New Patient form.
*/


const patientForm =
    document.getElementById("patientForm");


const patientIdInput =
    document.getElementById("patientId");


const patientMessage =
    document.getElementById("patientMessage");


/*
    Generate and display a Patient ID
    when the page loads.
*/
patientIdInput.value =
    generatePatientId();


/*
    Handle form submission.
*/
patientForm.addEventListener(
    "submit",
    function (event) {

        /*
            Stop the browser from
            refreshing the page.
        */
        event.preventDefault();


        /*
            Get values from the form.
        */
        const patientId =
            patientIdInput.value;

        const ssn =
            document.getElementById("ssn").value.trim();

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


        /*
            Clear the previous message.
        */
        patientMessage.textContent = "";
        patientMessage.className = "error-message";



        /*
            Validate First Name.
        */
        if (!isValidName(firstName)) {

            patientMessage.textContent =
                "Please enter a valid first name.";

            return;
        }


        /*
            Validate Last Name.
        */
        if (!isValidName(lastName)) {

            patientMessage.textContent =
                "Please enter a valid last name.";

            return;
        }


        /*
            Validate Date of Birth.
        */
        if (!isValidDateOfBirth(dob)) {

            patientMessage.textContent =
                "Please enter a valid date of birth.";

            return;
        }


        /*
            Validate Gender.
        */
        if (!gender) {

            patientMessage.textContent =
                "Please select a gender.";

            return;
        }


        /*
            Validate Height.
        */
        if (!isValidMeasurement(height)) {

            patientMessage.textContent =
                "Height must be greater than zero.";

            return;
        }


        /*
            Validate Weight.
        */
        if (!isValidMeasurement(weight)) {

            patientMessage.textContent =
                "Weight must be greater than zero.";

            return;
        }


        /*
            Validate Mobile.
        */
        if (!isValidMobile(mobile)) {

            patientMessage.textContent =
                "Mobile number must contain exactly 10 digits.";

            return;
        }


        /*
            Validate PIN.
        */
        if (!isValidPin(pin)) {

            patientMessage.textContent =
                "PIN must contain exactly 6 digits.";

            return;
        }


        /*
            Validate emergency contact name.
        */
        if (!isValidName(emergencyName)) {

            patientMessage.textContent =
                "Please enter a valid emergency contact name.";

            return;
        }


        /*
            Validate emergency mobile.
        */
        if (!isValidMobile(emergencyMobile)) {

            patientMessage.textContent =
                "Emergency mobile number must contain exactly 10 digits.";

            return;
        }


        /*
            Create the patient object.
        */
        const patient = {

            patientId: patientId,

            ssn: ssn,

            firstName: firstName,

            lastName: lastName,

            dob: dob,

            gender: gender,

            bloodGroup: bloodGroup,

            height: height,

            weight: weight,

            mobile: mobile,

            email: email,

            address: address,

            city: city,

            state: state,

            pin: pin,

            emergencyContact: {

                name: emergencyName,

                relationship: emergencyRelationship,

                mobile: emergencyMobile

            },

            createdAt:
                new Date().toISOString(),

            createdBy:
                getCurrentUser(),

            deleted: false

        };


        /*
            Save the patient.
        */
        addPatient(patient);

        patientMessage.className =
            "success-message";


        /*
            Tell the user that the
            patient was created.
        */
        patientMessage.textContent =
            "Patient created successfully. Patient ID: " +
            patient.patientId;


        /*
            Clear the form fields,
            except Patient ID.

            A new ID is generated below.
        */
        patientForm.reset();


        patientIdInput.value =
            generatePatientId();

    }
);

/*
    Generate a new Patient ID
    after the form is cleared.
*/
patientForm.addEventListener(
    "reset",
    function () {

        patientIdInput.value =
            generatePatientId();

    }
);