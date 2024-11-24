"use client";
import React from "react";
import { format } from "date-fns";

export function ExpenseCategoryList({ expenses }) {
  return (
    <div className="space-y-4">
      {expenses.length === 0 ? (
        <p className="text-gray-500">No expenses available</p>
      ) : (
        expenses.map((expense) => (
          <div key={expense.id} className="p-4 border rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <p className="font-bold text-lg">{expense.description}</p>
              <span className="text-2xl">{expense.emoji}</span>
            </div>
            <p className="text-red-500 text-xl">
              -₺{expense.amount.toFixed(2)}
            </p>
            <p className="text-sm text-gray-500">
              {format(new Date(expense.date), "PPP")}
            </p>
          </div>
        ))
      )}
    </div>
  );
}
