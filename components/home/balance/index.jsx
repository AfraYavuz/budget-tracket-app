"use client";
import React from "react";
import { useSelector } from "react-redux";

export function Balance() {
  const balance = useSelector((state) => state.finance.balance);

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold">Current Balance</h1>
      <p className="text-lg">
        {balance >= 0
          ? `💰 ₺${balance.toFixed(2)}`
          : `🔻 -₺${Math.abs(balance).toFixed(2)}`}
      </p>
    </div>
  );
}
