const SAVE_KEY = "my-expense-data";

export let expenses =JSON.parse(localStorage.getItem(SAVE_KEY)) || [] ;

export const addExpense = (newExpense) => {
    expenses.push(newExpense)
}

export const saveToLocalStorage = () =>{
    localStorage.setItem(SAVE_KEY, JSON.stringify(expenses));
}