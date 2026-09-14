// Get Bill ID from URL

const editBillId =
    new URLSearchParams(window.location.search)
        .get("billId");


// Get HTML elements

const billInfo =
    document.getElementById("billInfo");

const editBillForm =
    document.getElementById("editBillForm");

const editBillMessage =
    document.getElementById("editBillMessage");

const medicineList =
    document.getElementById("medicineList");

const testList =
    document.getElementById("testList");

const cancelEditButton =
    document.getElementById("cancelEditButton");


// Get the bill

const bills =
    getBills();

const editBill =
    bills.find(function (bill) {
        return bill.billId === editBillId;
    });


// Check whether bill exists

if (!editBill) {

    billInfo.textContent =
        "Bill not found.";

    editBillForm.style.display =
        "none";

} else {

    // Show bill information

    billInfo.innerHTML = `
        <p>
            <strong>Bill ID:</strong>
            ${editBill.billId}
        </p>

        <p>
            <strong>Patient ID:</strong>
            ${editBill.patientId}
        </p>

        <p>
            <strong>Created By:</strong>
            ${editBill.createdBy || "-"}
        </p>
    `;


    // Load existing room values

    document.getElementById("roomType").value =
        editBill.room.roomType || "";

    document.getElementById("roomDays").value =
        editBill.room.days || "";

    document.getElementById("dailyRate").value =
        editBill.room.dailyRate || "";


    // Display a medicine or diagnostic item

    function displayItem(item, list, type) {

        const itemElement =
            document.createElement("p");

        if (type === "medicine") {

            itemElement.textContent =
                item.medicineName +
                " | Quantity: " +
                item.quantity +
                " | Rate: " +
                item.rate +
                " | Amount: " +
                item.amount;

        } else {

            itemElement.textContent =
                item.testName +
                " | Rate: " +
                item.rate +
                " | Amount: " +
                item.amount;
        }


        const deleteButton =
            document.createElement("button");

        deleteButton.type = "button";
        deleteButton.textContent = "Delete";


        deleteButton.addEventListener(
            "click",
            function () {

                const index =
                    type === "medicine"
                        ? editBill.pharmacy.indexOf(item)
                        : editBill.diagnostics.indexOf(item);


                if (type === "medicine") {

                    editBill.pharmacy.splice(
                        index,
                        1
                    );

                } else {

                    editBill.diagnostics.splice(
                        index,
                        1
                    );
                }


                itemElement.remove();

                calculateTotals();
            }
        );


        itemElement.appendChild(
            document.createTextNode(" ")
        );

        itemElement.appendChild(
            deleteButton
        );

        list.appendChild(
            itemElement
        );
    }


    // Display existing medicines

    editBill.pharmacy.forEach(
        function (medicine) {

            displayItem(
                medicine,
                medicineList,
                "medicine"
            );
        }
    );


    // Display existing diagnostic tests

    editBill.diagnostics.forEach(
        function (test) {

            displayItem(
                test,
                testList,
                "test"
            );
        }
    );


    // Calculate all totals

    function calculateTotals() {

        const days =
            Number(
                document.getElementById(
                    "roomDays"
                ).value
            ) || 0;

        const rate =
            Number(
                document.getElementById(
                    "dailyRate"
                ).value
            ) || 0;


        const roomTotal =
            days * rate;


        let pharmacyTotal = 0;

        editBill.pharmacy.forEach(
            function (medicine) {

                pharmacyTotal +=
                    Number(medicine.amount);
            }
        );


        let diagnosticsTotal = 0;

        editBill.diagnostics.forEach(
            function (test) {

                diagnosticsTotal +=
                    Number(test.amount);
            }
        );


        const grandTotal =
            roomTotal +
            pharmacyTotal +
            diagnosticsTotal;


        document.getElementById(
            "roomTotal"
        ).textContent =
            roomTotal;

        document.getElementById(
            "pharmacyTotal"
        ).textContent =
            pharmacyTotal;

        document.getElementById(
            "diagnosticsTotal"
        ).textContent =
            diagnosticsTotal;

        document.getElementById(
            "grandTotal"
        ).textContent =
            grandTotal;
    }


    // Add Medicine

    document.getElementById(
        "addMedicineButton"
    ).addEventListener(
        "click",
        function () {

            const name =
                document.getElementById(
                    "medicineName"
                ).value.trim();

            const quantity =
                Number(
                    document.getElementById(
                        "medicineQuantity"
                    ).value
                );

            const rate =
                Number(
                    document.getElementById(
                        "medicineRate"
                    ).value
                );


            if (
                !name ||
                quantity <= 0 ||
                rate < 0
            ) {

                editBillMessage.textContent =
                    "Please enter valid medicine details.";

                editBillMessage.className =
                    "error-message";

                return;
            }


            const medicine = {

                medicineName:
                    name,

                quantity:
                    quantity,

                rate:
                    rate,

                amount:
                    quantity * rate
            };


            editBill.pharmacy.push(
                medicine
            );


            displayItem(
                medicine,
                medicineList,
                "medicine"
            );


            document.getElementById(
                "medicineName"
            ).value = "";

            document.getElementById(
                "medicineQuantity"
            ).value = "";

            document.getElementById(
                "medicineRate"
            ).value = "";


            calculateTotals();
        }
    );


    // Add Diagnostic Test

    document.getElementById(
        "addTestButton"
    ).addEventListener(
        "click",
        function () {

            const name =
                document.getElementById(
                    "testName"
                ).value.trim();

            const rate =
                Number(
                    document.getElementById(
                        "testRate"
                    ).value
                );


            if (
                !name ||
                rate < 0
            ) {

                editBillMessage.textContent =
                    "Please enter valid diagnostic details.";

                editBillMessage.className =
                    "error-message";

                return;
            }


            const test = {

                testName:
                    name,

                rate:
                    rate,

                amount:
                    rate
            };


            editBill.diagnostics.push(
                test
            );


            displayItem(
                test,
                testList,
                "test"
            );


            document.getElementById(
                "testName"
            ).value = "";

            document.getElementById(
                "testRate"
            ).value = "";


            calculateTotals();
        }
    );


    // Recalculate when room values change

    document.getElementById(
        "roomDays"
    ).addEventListener(
        "input",
        calculateTotals
    );

    document.getElementById(
        "dailyRate"
    ).addEventListener(
        "input",
        calculateTotals
    );


    // Save Changes

    editBillForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const days =
                Number(
                    document.getElementById(
                        "roomDays"
                    ).value
                ) || 0;

            const dailyRate =
                Number(
                    document.getElementById(
                        "dailyRate"
                    ).value
                ) || 0;


            const roomTotal =
                days * dailyRate;


            let pharmacyTotal = 0;

            editBill.pharmacy.forEach(
                function (medicine) {

                    pharmacyTotal +=
                        Number(medicine.amount);
                }
            );


            let diagnosticsTotal = 0;

            editBill.diagnostics.forEach(
                function (test) {

                    diagnosticsTotal +=
                        Number(test.amount);
                }
            );


            // Update room

            editBill.room = {

                roomType:
                    document.getElementById(
                        "roomType"
                    ).value,

                days:
                    days,

                dailyRate:
                    dailyRate,

                total:
                    roomTotal
            };


            // Update grand total

            editBill.total =
                roomTotal +
                pharmacyTotal +
                diagnosticsTotal;


            // Update audit information

            editBill.updatedAt =
                new Date().toISOString();

            editBill.updatedBy =
                getCurrentUser();


            // Save bill

            const success =
                updateBill(editBill);


            if (!success) {

                editBillMessage.textContent =
                    "Unable to update bill.";

                editBillMessage.className =
                    "error-message";

                return;
            }


            editBillMessage.textContent =
                "Bill updated successfully.";

            editBillMessage.className =
                "success-message";


            // Return to Bill Details

            setTimeout(
                function () {

                    window.location.href =
                        "bill-details.html?billId=" +
                        editBill.billId;

                },
                1000
            );
        }
    );


    // Cancel Edit

    cancelEditButton.addEventListener(
        "click",
        function () {

            window.location.href =
                "bill-details.html?billId=" +
                editBill.billId;
        }
    );


    // Calculate totals when page loads

    calculateTotals();
}