import React from "react";

import { AddRevenue } from "@/components/finances/addRevenue";
import { RevenueList } from "@/components/finances/revenueListItem";

const AddRevenuePage = () => {
  return (
    <div className="space-y-6">
      <AddRevenue />
      <p className=" text-xl text-green-600">Revenue List:</p>
      <RevenueList />
    </div>
  );
};

export default AddRevenuePage;
