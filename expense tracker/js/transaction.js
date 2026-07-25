const form = document.getElementById("transactionForm");

const currentUser = localStorage.getItem("currentUser") || "Guest";

const storageKey = `transactions_${currentUser}`;

let transactions =
JSON.parse(localStorage.getItem(storageKey)) || [];

const editIndex = localStorage.getItem("editIndex");

// Load existing transaction while editing
if (editIndex !== null && transactions[editIndex]) {

    const t = transactions[editIndex];

    document.getElementById("amount").value = t.amount;
    document.getElementById("type").value = t.type;
    document.getElementById("category").value = t.category;
    document.getElementById("date").value = t.date;
    document.getElementById("notes").value = t.notes;

} else {

    localStorage.removeItem("editIndex");
}

form.addEventListener("submit", function (e) {

    e.preventDefault();

    const transaction = {

        amount: document.getElementById("amount").value,
        type: document.getElementById("type").value,
        category: document.getElementById("category").value,
        date: document.getElementById("date").value,
        notes: document.getElementById("notes").value

    };

    if (editIndex !== null && transactions[editIndex]) {

        transactions[editIndex] = transaction;
        localStorage.removeItem("editIndex");

    } else {

        transactions.push(transaction);
    }

    localStorage.setItem(storageKey, JSON.stringify(transactions));

    alert("Transaction Saved Successfully!");

    window.location.href = "dashboard.html";

});