import React from "react";

import { AddExpense } from "@/components/finances/addExpense";
import { ExpenseList } from "@/components/finances/expenseListItem";

const AddExpensePage = () => {
  return (
    <div className="space-y-6">
      <AddExpense />
      <p className=" text-xl text-red-700">Expense List:</p>
      <ExpenseList />
    </div>
  );
};

export default AddExpensePage;
