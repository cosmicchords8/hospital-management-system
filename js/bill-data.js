 /*
     BILL-DATA.JS

     Responsibility:
     Manage bill data.
 */


// Name of the localStorage entry
const BILL_STORAGE_KEY = "bills";


// Get all bills
function getBills() {

    const data =
        localStorage.getItem(
            BILL_STORAGE_KEY
        );

    // If no bills exist
    if (!data) {

        return [];

    }

    // Convert JSON into JavaScript array
    return JSON.parse(data);

}


// Save all bills
function saveBills(bills) {

    localStorage.setItem(
        BILL_STORAGE_KEY,
        JSON.stringify(bills)
    );

}


// Generate the next Bill ID
function generateBillId() {

    const bills =
        getBills();

    const nextNumber =
        bills.length + 1;

    return "BILL-" +
        String(nextNumber).padStart(6, "0");

}


// Add a new bill
function addBill(bill) {

    const bills =
        getBills();

    bills.push(bill);

    saveBills(bills);

}


// Update an existing bill
function updateBill(updatedBill) {

    const bills =
        getBills();

    const billIndex =
        bills.findIndex(
            function (bill) {

                return (
                    bill.billId ===
                    updatedBill.billId
                );

            }
        );

    if (billIndex === -1) {

        return false;

    }

    bills[billIndex] =
        updatedBill;

    saveBills(bills);

    return true;

}


// Delete a bill
function deleteBill(billId) {

    const bills =
        getBills();

    const bill =
        bills.find(
            function (bill) {

                return (
                    bill.billId ===
                    billId
                );

            }
        );

    if (!bill) {

        return false;

    }

    // Soft delete
    bill.deleted = true;

    bill.deletedAt =
        new Date().toISOString();

    bill.deletedBy =
        getCurrentUser();

    saveBills(bills);

    return true;

}


// Mark a bill as paid

function toggleBillPaymentStatus(billId) {

    const bills =
        getBills();

    const bill =
        bills.find(
            function (bill) {

                return (
                    bill.billId ===
                    billId
                );

            }
        );

    if (!bill) {

        return false;

    }

    if (
        bill.paymentStatus ===
        "PAID"
    ) {

        bill.paymentStatus =
            "UNPAID";

        bill.paidAt = null;

        bill.paidBy = null;

    } else {

        bill.paymentStatus =
            "PAID";

        bill.paidAt =
            new Date().toISOString();

        bill.paidBy =
            getCurrentUser();

    }

    saveBills(bills);

    return true;

}
