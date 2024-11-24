"use client";
import React from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { loadTransactionsFromLocalStorage } from "@/lib/features/financeSlice";
import { Balance } from "@/components/home/balance";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTransactionsFromLocalStorage());
  }, [dispatch]);
  return (
    <div>
      <Balance />
    </div>
  );
};

export default HomePage;
