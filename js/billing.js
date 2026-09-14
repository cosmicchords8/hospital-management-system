// hospital/js/billing.js

/*
    BILLING.JS

    Responsibility:
    Handle the billing page.
*/


/*
    PATIENT SELECTION
*/


// Get Patient ID from the URL
const billingPatientId =
    new URLSearchParams(
        window.location.search
    ).get("patientId");


// Get HTML elements
const patientSelect =
    document.getElementById("patientSelect");

const patientInfo =
    document.getElementById("patientInfo");


// Get all patients
const billingPatients =
    getPatients();


// Only show active patients
const activeBillingPatients =
    billingPatients.filter(
        function (patient) {
            return !patient.deleted;
        }
    );


// Add patients to the dropdown
activeBillingPatients.forEach(
    function (patient) {

        const option =
            document.createElement("option");

        option.value =
            patient.patientId;

        option.textContent =
            patient.patientId +
            " - " +
            patient.firstName +
            " " +
            patient.lastName;

        patientSelect.appendChild(option);
    }
);


// If the page came from Patient Details
if (billingPatientId) {

    patientSelect.value =
        billingPatientId;

    showSelectedPatient();
}


// When the user selects a patient
patientSelect.addEventListener(
    "change",
    function () {

        showSelectedPatient();

    }
);


// Display selected patient
function showSelectedPatient() {

    const selectedPatient =
        activeBillingPatients.find(
            function (patient) {

                return (
                    patient.patientId ===
                    patientSelect.value
                );

            }
        );


    if (!selectedPatient) {

        patientInfo.textContent =
            "Select a patient to create a bill.";

        return;
    }


    patientInfo.innerHTML = `

        <p>
            <strong>Patient ID:</strong>
            ${selectedPatient.patientId}
        </p>

        <p>
            <strong>Patient Name:</strong>
            ${selectedPatient.firstName}
            ${selectedPatient.lastName}
        </p>

    `;
}


/*
    MEDICINES
*/


// Store added medicines
let medicines = [];


// Get medicine fields
const medicineName =
    document.getElementById("medicineName");

const medicineQuantity =
    document.getElementById("medicineQuantity");

const medicineRate =
    document.getElementById("medicineRate");

const addMedicineButton =
    document.getElementById("addMedicineButton");

const medicineList =
    document.getElementById("medicineList");


// Add medicine
addMedicineButton.addEventListener(
    "click",
    function () {

        const name =
            medicineName.value.trim();

        const quantity =
            Number(medicineQuantity.value);

        const rate =
            Number(medicineRate.value);


        if (name === "") {

            alert("Enter medicine name.");

            return;
        }


        if (quantity <= 0) {

            alert("Enter a valid quantity.");

            return;
        }


        if (rate < 0) {

            alert("Enter a valid rate.");

            return;
        }


        const medicine = {

            medicineName: name,

            quantity: quantity,

            rate: rate,

            amount: quantity * rate

        };


        medicines.push(medicine);


        displayMedicines();


        medicineName.value = "";

        medicineQuantity.value = "";

        medicineRate.value = "";


        calculateTotals();

    }
);


// Display medicines
function displayMedicines() {

    medicineList.innerHTML = "";


    medicines.forEach(
        function (medicine, index) {

            const medicineItem =
                document.createElement("p");


            medicineItem.textContent =
                medicine.medicineName +
                " | Quantity: " +
                medicine.quantity +
                " | Rate: " +
                medicine.rate +
                " | Amount: " +
                medicine.amount;


            const deleteButton =
                document.createElement("button");


            deleteButton.type =
                "button";


            deleteButton.textContent =
                "Delete";


            deleteButton.addEventListener(
                "click",
                function () {

                    medicines.splice(
                        index,
                        1
                    );


                    displayMedicines();

                    calculateTotals();

                }
            );


            medicineItem.appendChild(
                deleteButton
            );


            medicineList.appendChild(
                medicineItem
            );

        }
    );

}


/*
    DIAGNOSTIC TESTS
*/


// Store added tests
let diagnostics = [];


// Get test fields
const testName =
    document.getElementById("testName");

const testRate =
    document.getElementById("testRate");

const addTestButton =
    document.getElementById("addTestButton");

const testList =
    document.getElementById("testList");


// Add diagnostic test
addTestButton.addEventListener(
    "click",
    function () {

        const name =
            testName.value.trim();

        const rate =
            Number(testRate.value);


        if (name === "") {

            alert("Enter test name.");

            return;
        }


        if (rate < 0) {

            alert("Enter a valid test rate.");

            return;
        }


        const test = {

            testName: name,

            rate: rate,

            amount: rate

        };


        diagnostics.push(test);


        displayDiagnostics();


        testName.value = "";

        testRate.value = "";


        calculateTotals();

    }
);


// Display diagnostic tests
function displayDiagnostics() {

    testList.innerHTML = "";


    diagnostics.forEach(
        function (test, index) {

            const testItem =
                document.createElement("p");


            testItem.textContent =
                test.testName +
                " | Rate: " +
                test.rate +
                " | Amount: " +
                test.amount;


            const deleteButton =
                document.createElement("button");


            deleteButton.type =
                "button";


            deleteButton.textContent =
                "Delete";


            deleteButton.addEventListener(
                "click",
                function () {

                    diagnostics.splice(
                        index,
                        1
                    );


                    displayDiagnostics();

                    calculateTotals();

                }
            );


            testItem.appendChild(
                deleteButton
            );


            testList.appendChild(
                testItem
            );

        }
    );

}


/*
    BILL TOTALS
*/


// Get total elements
const roomTotal =
    document.getElementById("roomTotal");

const pharmacyTotal =
    document.getElementById("pharmacyTotal");

const diagnosticsTotal =
    document.getElementById("diagnosticsTotal");

const grandTotal =
    document.getElementById("grandTotal");


// Get room fields
const roomDays =
    document.getElementById("roomDays");

const dailyRate =
    document.getElementById("dailyRate");


// Calculate all totals
function calculateTotals() {

    const days =
        Number(roomDays.value) || 0;

    const rate =
        Number(dailyRate.value) || 0;


    const roomAmount =
        days * rate;


    let pharmacyAmount = 0;


    medicines.forEach(
        function (medicine) {

            pharmacyAmount +=
                medicine.amount;

        }
    );


    let diagnosticsAmount = 0;


    diagnostics.forEach(
        function (test) {

            diagnosticsAmount +=
                test.amount;

        }
    );


    const total =
        roomAmount +
        pharmacyAmount +
        diagnosticsAmount;


    roomTotal.textContent =
        roomAmount;

    pharmacyTotal.textContent =
        pharmacyAmount;

    diagnosticsTotal.textContent =
        diagnosticsAmount;

    grandTotal.textContent =
        total;

}


// Recalculate room total when values change
roomDays.addEventListener(
    "input",
    calculateTotals
);


dailyRate.addEventListener(
    "input",
    calculateTotals
);


/*
    CREATE BILL
*/


const billForm =
    document.getElementById("billForm");

const billMessage =
    document.getElementById("billMessage");


billForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const selectedPatientId =
            patientSelect.value;


        if (selectedPatientId === "") {

            billMessage.textContent =
                "Please select a patient.";

            billMessage.className =
                "error-message";

            return;
        }


        const days =
            Number(roomDays.value) || 0;

        const rate =
            Number(dailyRate.value) || 0;


        const roomAmount =
            days * rate;


        let pharmacyAmount = 0;

        medicines.forEach(
            function (medicine) {

                pharmacyAmount +=
                    medicine.amount;

            }
        );


        let diagnosticsAmount = 0;

        diagnostics.forEach(
            function (test) {

                diagnosticsAmount +=
                    test.amount;

            }
        );


        const total =
            roomAmount +
            pharmacyAmount +
            diagnosticsAmount;


        const bill = {

            billId: generateBillId(),

            patientId: selectedPatientId,

            room: {

                roomType:
                    document.getElementById("roomType").value,

                days: days,

                dailyRate: rate,

                total: roomAmount

            },

            pharmacy: medicines,

            diagnostics: diagnostics,

            total: total,

            paymentStatus: "UNPAID",

            paidAt: null,

            paidBy: null,

            createdAt:
                new Date().toISOString(),

            createdBy:
                getCurrentUser(),

            updatedAt: null,

            updatedBy: null

        };


        addBill(bill);


        billMessage.textContent =
            "Bill " +
            bill.billId +
            " created successfully.";

        billMessage.className =
            "success-message";

    }
);