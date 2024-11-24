import { createSlice } from "@reduxjs/toolkit";

const getTransactionsFromLocalStorage = () => {
  if (typeof window === "undefined") return [];
  const storedTransactions = localStorage.getItem("transactions");
  return storedTransactions ? JSON.parse(storedTransactions) : [];
};

const initialState = {
  transactions: getTransactionsFromLocalStorage(),
  balance: 0,
  categories: ["Food", "Transport", "Entertainment", "Utilities", "Salary"],
};

const calculateBalance = (transactions) => {
  return transactions.reduce((total, transaction) => {
    return transaction.type === "expense"
      ? total - transaction.amount
      : total + transaction.amount;
  }, 0);
};

const financeSlice = createSlice({
  name: "finance",
  initialState,
  reducers: {
    addTransaction(state, action) {
      state.transactions.push(action.payload);

      state.balance = calculateBalance(state.transactions);

      localStorage.setItem("transactions", JSON.stringify(state.transactions));
    },
    loadTransactionsFromLocalStorage(state) {
      state.transactions = getTransactionsFromLocalStorage();
      state.balance = calculateBalance(state.transactions);
    },
  },
});

export const { addTransaction, loadTransactionsFromLocalStorage } =
  financeSlice.actions;
export default financeSlice.reducer;
