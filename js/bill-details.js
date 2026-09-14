 // hospital/js/bill-details.js

/*
    BILL-DETAILS.JS

    Responsibility:
    Display one saved bill.
*/


// Get Bill ID from URL
const billId =
    new URLSearchParams(
        window.location.search
    ).get("billId");


// Get HTML elements
const billDetails =
    document.getElementById(
        "billDetails"
    );

const backToAllBillsButton =
    document.getElementById(
        "backToAllBillsButton"
    );

const patientDetailsButton =
    document.getElementById(
        "patientDetailsButton"
    );

const editBillButton =
    document.getElementById(
        "editBillButton"
    );

const markPaidButton =
    document.getElementById(
        "markPaidButton"
    );

const deleteBillButton =
    document.getElementById(
        "deleteBillButton"
    );


// Get all bills
const bills =
    getBills();


// Find the bill
const bill =
    bills.find(
        function (item) {

            return (
                item.billId ===
                billId
            );

        }
    );

// Check whether bill exists
if (!bill) {

    billDetails.textContent =
        "Bill not found.";

} else {

    /*
        Patient Details button
        goes back to the patient
        who owns this bill.
    */


    backToAllBillsButton.addEventListener(
        "click",
        function () {

            window.location.href =
                "bills.html";

        }
    );


    patientDetailsButton.addEventListener(
        "click",
        function () {

            window.location.href =
                "patient-details.html?patientId=" +
                bill.patientId;

        }
    );


    editBillButton.addEventListener(
        "click",
        function () {

            window.location.href =
                "edit-bill.html?billId=" +
                bill.billId;

        }
    );

    // Change button text depending on payment status
    if (
        bill.paymentStatus ===
        "PAID"
    ) {

        markPaidButton.textContent =
            "Mark as Unpaid";

    } else {

        markPaidButton.textContent =
            "Mark as Paid";

    }


    markPaidButton.addEventListener(
        "click",
        function () {

            let message;

            if (
                bill.paymentStatus ===
                "PAID"
            ) {

                message =
                    "Mark this bill as unpaid?";

            } else {

                message =
                    "Mark this bill as paid?";

            }

            const confirmed =
                confirm(message);

            if (!confirmed) {

                return;

            }

            const success =
                toggleBillPaymentStatus(
                    bill.billId
                );

            if (success) {

                window.location.reload();

            }

        }
    );

    




    deleteBillButton.addEventListener(
        "click",
        function () {

            const confirmed =
                confirm(
                    "Delete this bill?"
                );

            if (!confirmed) {

                return;

            }

            const success =
                deleteBill(
                    bill.billId
                );

            if (success) {

                window.location.href =
                    "bills.html";

            }

        }
    );



    /*
        Display basic bill information.
    */

    billDetails.innerHTML = `

        <h3>
            Bill Information
        </h3>

        <p>
            <strong>Bill ID:</strong>
            ${bill.billId}
        </p>

        <p>
            <strong>Patient ID:</strong>
            ${bill.patientId}
        </p>


        <p>
            <strong>Created:</strong>
            ${new Date(
                bill.createdAt
            ).toLocaleString()}
        </p>

        <p>
            <strong>Created By:</strong>
            ${bill.createdBy || "-"}
        </p>

        <p>
            <strong>Updated:</strong>
            ${
                bill.updatedAt
                    ? new Date(
                        bill.updatedAt
                    ).toLocaleString()
                    : "-"
            }
        </p>

        <p>
            <strong>Updated By:</strong>
            ${bill.updatedBy || "-"}
        </p>





        <h3>
            Room Charges
        </h3>

        <p>
            <strong>Room Type:</strong>
            ${bill.room.roomType || "Not provided"}
        </p>

        <p>
            <strong>Days:</strong>
            ${bill.room.days}
        </p>

        <p>
            <strong>Daily Rate:</strong>
            ${bill.room.dailyRate}
        </p>

        <p>
            <strong>Room Total:</strong>
            ${bill.room.total}
        </p>


        <h3>
            Pharmacy
        </h3>

        <div id="medicineDetails">
        </div>


        <h3>
            Diagnostics
        </h3>

        <div id="diagnosticDetails">
        </div>


        <h3>
            Total
        </h3>

        <p>
            <strong>Grand Total:</strong>
            ${bill.total}
        </p>

        <p>
            <strong>Payment Status:</strong>
            ${bill.paymentStatus}
        </p>

        <p>
            <strong>Paid At:</strong>
            ${
                bill.paidAt
                    ? new Date(
                        bill.paidAt
                    ).toLocaleString()
                    : "-"
            }
        </p>

        <p>
            <strong>Paid By:</strong>
            ${bill.paidBy || "-"}
        </p>

    `;


    /*
        Display medicines.
    */

    const medicineDetails =
        document.getElementById(
            "medicineDetails"
        );


    bill.pharmacy.forEach(
        function (medicine) {

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


            medicineDetails.appendChild(
                medicineItem
            );

        }
    );


    /*
        Display diagnostic tests.
    */

    const diagnosticDetails =
        document.getElementById(
            "diagnosticDetails"
        );


    bill.diagnostics.forEach(
        function (test) {

            const testItem =
                document.createElement("p");


            testItem.textContent =
                test.testName +
                " | Rate: " +
                test.rate +
                " | Amount: " +
                test.amount;


            diagnosticDetails.appendChild(
                testItem
            );

        }
    );

}