"use client";
import React from "react";
import { useSelector } from "react-redux";
import { format } from "date-fns";

export function RevenueList() {
  const revenues = useSelector((state) =>
    state.finance.transactions.filter(
      (transaction) => transaction.type === "revenue"
    )
  );

  return (
    <div className="space-y-4">
      {revenues.length === 0 ? (
        <p className="text-gray-500">No revenues available</p>
      ) : (
        revenues.map((revenue) => (
          <div key={revenue.id} className="p-4 border rounded-lg shadow">
            <div className="flex items-center justify-between">
              <p className="font-bold">{revenue.description}</p>
              <span className="text-2xl">{revenue.emoji}</span>
            </div>
            <p className="text-green-500">+₺{revenue.amount.toFixed(2)}</p>
            <p className="text-sm text-gray-500">
              {format(new Date(revenue.date), "PPP")}
            </p>
          </div>
        ))
      )}
    </div>
  );
}
