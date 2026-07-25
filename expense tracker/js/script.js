const currentUser = localStorage.getItem("currentUser") || "Guest";

document.getElementById("username").textContent = currentUser;

const storageKey = `transactions_${currentUser}`;

const transactions =
JSON.parse(localStorage.getItem(storageKey)) || [];

const transactionList = document.getElementById("transactionList");
const search = document.getElementById("search");
const filter = document.getElementById("filter");
const dateFilter = document.getElementById("dateFilter");
const incomeEl = document.getElementById("income");
const expenseEl = document.getElementById("expense");
const balanceEl = document.getElementById("balance");

let income = 0;
let expense = 0;

function displayTransactions() {

    transactionList.innerHTML = "";

    income = 0;
    expense = 0;

    const keyword = search.value.toLowerCase();
    const selectedFilter = filter.value;
    const selectedDate = dateFilter.value;

    transactions.forEach((transaction, index) => {

        if (!transaction.category.toLowerCase().includes(keyword)) {
            return;
        }

        if (selectedFilter !== "All" && transaction.type !== selectedFilter) {
            return;
        }

        if (selectedDate && transaction.date !== selectedDate) {
            return;
        }

        const item = document.createElement("div");
        item.className = "item";

        if (transaction.type === "Income") {

            income += Number(transaction.amount);

            item.innerHTML = `
                <span>${transaction.category}</span>
                <span class="income">+₹${transaction.amount}</span>
                <div>
                    <button onclick="editTransaction(${index})">✏️</button>
                    <button onclick="deleteTransaction(${index})">🗑️</button>
                </div>
            `;

        } else {

            expense += Number(transaction.amount);

            item.innerHTML = `
                <span>${transaction.category}</span>
                <span class="expense">-₹${transaction.amount}</span>
                <div>
                    <button onclick="editTransaction(${index})">✏️</button>
                    <button onclick="deleteTransaction(${index})">🗑️</button>
                </div>
            `;
        }

        transactionList.appendChild(item);
    });

    incomeEl.innerText = "₹" + income;
    expenseEl.innerText = "₹" + expense;
    balanceEl.innerText = "₹" + (income - expense);
}

function deleteTransaction(index) {

    transactions.splice(index, 1);

    localStorage.setItem(storageKey, JSON.stringify(transactions));

    displayTransactions();
}

function editTransaction(index) {

    localStorage.setItem("editIndex", index);

    window.location.href = "add.html";
}

displayTransactions();

search.addEventListener("keyup", displayTransactions);
filter.addEventListener("change", displayTransactions);
dateFilter.addEventListener("change", displayTransactions);