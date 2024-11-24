"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCategory } from "@/lib/financeSlice";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function BudgetForm() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.finance.categories);

  const handleSubmit = (e, categoryId) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const budgetLimit = parseFloat(formData.get("budgetLimit"));
    dispatch(updateCategory({ id: categoryId, budgetLimit }));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Budget Limits</h2>
      {categories.map((category) => (
        <form
          key={category.id}
          onSubmit={(e) => handleSubmit(e, category.id)}
          className="flex items-center space-x-2"
        >
          <label className="w-1/3">{category.name}</label>
          <Input
            type="number"
            name="budgetLimit"
            defaultValue={category.budgetLimit}
            className="w-1/3"
          />
          <Button type="submit">Set Limit</Button>
          {category.budgetLimit &&
            category.expensesTotal >= category.budgetLimit * 0.8 && (
              <span className="text-yellow-500 text-sm">
                Warning: You have reached 80% of the limit!
              </span>
            )}
        </form>
      ))}
    </div>
  );
}
