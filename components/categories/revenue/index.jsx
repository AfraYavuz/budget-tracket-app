"use client";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RevenueCategoryList } from "@/components/finances/revenueCategoryList";

export function Revenue() {
  const router = useRouter();
  const categories = useSelector((state) => state.finance.categories);
  const revenues = useSelector((state) =>
    state.finance.transactions.filter(
      (transaction) => transaction.type === "revenue"
    )
  );

  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredRevenues =
    selectedCategory === "All"
      ? revenues
      : revenues.filter((revenue) => revenue.category === selectedCategory);

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Category Filter */}
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

      {/* Revenue List */}
      <Card>
        <CardHeader className="border-b">
          <CardTitle className="text-xl font-semibold">Revenue List</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 mt-4">
          {filteredRevenues.length > 0 ? (
            <RevenueCategoryList revenues={filteredRevenues} />
          ) : (
            <p className="text-gray-500">No revenue found for this category.</p>
          )}
        </CardContent>
      </Card>

      <Button onClick={() => router.push("/addRevenue")} className="w-full">
        Add New Revenue
      </Button>
    </div>
  );
}
