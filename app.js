import { expenses, addExpense, saveToLocalStorage } from "./data.js";
import { calculateTotal } from "./utils.js";

const nameInput = document.getElementById("name");
const amountInput = document.getElementById("amt");
const categoryInput = document.getElementById("category");
const list = document.getElementById("expense-list");
const submitInput = document.getElementById("submit");
const filterCategory = document.getElementById("filter-category");
const dateInput = document.getElementById("expense-date");

submitInput.addEventListener("click", (e) => {
  e.preventDefault();

  const newEntry = {
    id: Date.now(),
    name: nameInput.value,
    amount: Number(amountInput.value),
    category: categoryInput.value,
    date: dateInput.value || new Date().toISOString().split("T")[0], // Default to today
  };

  addExpense(newEntry);
  saveToLocalStorage();
  console.log("New Total:", calculateTotal(expenses));

  nameInput.value = "";
  amountInput.value = "";
  categoryInput.value = "";

  render();
});

function render(dataToDisplay = expenses) {
  // 1. Sort data so the newest dates are at the top
  const sortedData = [...dataToDisplay].sort(
    (a, b) => new Date(b.date) - new Date(a.date),
  );

  // 2. Map through the sorted data
  list.innerHTML = sortedData
    .map((item) => {
      return `
            <li class="expense-item">
                <div class="item-info">
                    <strong>${item.name}</strong>
                    <small>${item.date}</small>
                </div>
                <div class="item-amount">
                    $${item.amount} <span class="badge">${item.category}</span>
                </div>
            </li>
        `;
    })
    .join("");

  const totalDisplay = document.getElementById("total-display");
  totalDisplay.innerText = `Total Expense: $${calculateTotal(dataToDisplay)}`;
}

filterCategory.addEventListener("change", (e) => {
  const selected = e.target.value;

  if (selected === "All") {
    render(expenses);
  } else {
    const filtered = expenses.filter((item) => item.category === selected);
    render(filtered);
  }
});
render();