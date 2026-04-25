export const calculateTotal = (expenses) => {
    return expenses.reduce((sum, item) => sum + item.amount, 0);
};