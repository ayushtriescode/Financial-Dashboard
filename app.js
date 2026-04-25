import { expenses, addExpense } from "./data.js";
import { calculateTotal } from "./utils.js";

const nameInput = document.getElementById("name");
const amountInput = document.getElementById("amt");
const categoryInput = document.getElementById("category");
const list = document.getElementById("expense-list");
const submitInput = document.getElementById("submit");
const filterCategory = document.getElementById("filter-category")

submitInput.addEventListener("click", (e) =>{
    e.preventDefault();

    const newEntry = {
        id: Date.now(),
        name: nameInput.value,
        amount: Number(amountInput.value),
        category: categoryInput.value
    }

    addExpense(newEntry);
    console.log("New Total:", calculateTotal(expenses));

    nameInput.value = "";
    amountInput.value = "";
    categoryInput.value = "";

    render();
})

function render(dataToDisplay = expenses){
    const expenseList = dataToDisplay.map(item =>{
        return `<li>${item.name}: ${item.amount} [${item.category}]</li>`
    })

    list.innerHTML = expenseList.join("");
    const totalDisplay = document.getElementById("total-display");
    totalDisplay.innerText = `Total Expense: $${calculateTotal(dataToDisplay)}`;
}

filterCategory.addEventListener("change", (e) =>{
    const selected = e.target.value;

    if(selected === "All"){
        render(expenses);
    }
    else{
        const filtered = expenses.filter(item => item.category === selected);
        render(filtered);
    }
});