"use client";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExpenseList } from "@/components/finances/expenseListItem";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ExpenseCategoryList } from "@/components/finances/expenseCategoryList";

export function Expense() {
  const router = useRouter();
  const categories = useSelector((state) => state.finance.categories);
  const expenses = useSelector((state) =>
    state.finance.transactions.filter(
      (transaction) => transaction.type === "expense"
    )
  );

  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filter expenses based on selected category
  const filteredExpenses =
    selectedCategory === "All"
      ? expenses
      : expenses.filter((expense) => expense.category === selectedCategory);

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div>
        <Label htmlFor="category">Filter by Category</Label>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader className="border-b">
          <CardTitle className="text-xl font-semibold">Expense List</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 mt-4">
          {filteredExpenses.length > 0 ? (
            <ExpenseCategoryList expenses={filteredExpenses} />
          ) : (
            <p className="text-gray-500">
              No expenses found for this category.
            </p>
          )}
        </CardContent>
      </Card>

      <Button onClick={() => router.push("/addExpense")} className="w-full">
        Add New Expense
      </Button>
    </div>
  );
}
