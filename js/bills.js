// hospital/js/bills.js

/*
    BILLS.JS

    Responsibility:
    Display and search saved bills.
*/


// Get HTML elements
const billTableBody =
    document.getElementById("billTableBody");

const billCount =
    document.getElementById("billCount");

const billListMessage =
    document.getElementById("billListMessage");

const billPatientSearch =
    document.getElementById("billPatientSearch");

const billIdSearch =
    document.getElementById("billIdSearch");

const searchBillButton =
    document.getElementById("searchBillButton");

const clearBillSearchButton =
    document.getElementById("clearBillSearchButton");


// Store current searches
let billPatientSearchText = "";

let billIdSearchText = "";


// Display bills
function displayBills() {

    const allBills =
        getBills();


    const filteredBills =
        allBills.filter(
            function (bill) {

                const patientMatches =
                    bill.patientId
                        .toLowerCase()
                        .includes(
                            billPatientSearchText
                        );


                const billMatches =
                    bill.billId
                        .toLowerCase()
                        .includes(
                            billIdSearchText
                        );


                return (
                    patientMatches &&
                    billMatches
                );

            }
        );


    billTableBody.innerHTML = "";


    billCount.textContent =
        filteredBills.length;


    if (filteredBills.length === 0) {

        billListMessage.textContent =
            "No bills found.";

        return;
    }


    billListMessage.textContent = "";


    filteredBills.forEach(
        function (bill) {

            const row =
                document.createElement("tr");


            row.innerHTML = `

                <td>
                    ${bill.billId}
                </td>

                <td>
                    ${bill.patientId}
                </td>

                <td>
                    ${formatBillDate(bill.createdAt)}
                </td>

                <td>
                    ${bill.total}
                </td>

                <td>
                    ${bill.paymentStatus}
                </td>

                <td>

                    <a
                        href="bill-details.html?billId=${bill.billId}"
                    >
                        View
                    </a>

                </td>

            `;


            billTableBody.appendChild(row);

        }
    );

}


// Format date
function formatBillDate(dateTime) {

    return new Date(
        dateTime
    ).toLocaleString();

}


// Search
searchBillButton.addEventListener(
    "click",
    function () {

        billPatientSearchText =
            billPatientSearch.value
                .trim()
                .toLowerCase();


        billIdSearchText =
            billIdSearch.value
                .trim()
                .toLowerCase();


        displayBills();

    }
);


// Press Enter to search
billPatientSearch.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {

            searchBillButton.click();

        }

    }
);


billIdSearch.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {

            searchBillButton.click();

        }

    }
);


// Clear search
clearBillSearchButton.addEventListener(
    "click",
    function () {

        billPatientSearch.value = "";

        billIdSearch.value = "";

        billPatientSearchText = "";

        billIdSearchText = "";

        displayBills();

    }
);


// Display bills when page loads
displayBills();