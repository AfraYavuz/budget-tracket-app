"use client";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

export function ExpenseReportingComponent() {
  const [reportType, setReportType] = useState("monthly");
  const transactions = useSelector((state) => state.finance.transactions);

  const getChartData = () => {
    const now = new Date();
    const filteredExpenses = transactions.filter((t) => {
      const transactionDate = new Date(t.date);
      if (reportType === "monthly") {
        return (
          transactionDate.getMonth() === now.getMonth() &&
          transactionDate.getFullYear() === now.getFullYear()
        );
      } else {
        return transactionDate.getFullYear() === now.getFullYear();
      }
    });

    const expensesByCategory = filteredExpenses.reduce((acc, t) => {
      if (t.type === "expense") {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
      }
      return acc;
    }, {});

    const categoryLabels = Object.keys(expensesByCategory);
    const categoryData = Object.values(expensesByCategory);

    return {
      categoryChartData: {
        labels: categoryLabels,
        datasets: [
          {
            label: "Category Based Expenses",
            data: categoryData,
            backgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56",
              "#4BC0C0",
              "#9966FF",
              "#FF9F40",
              "#C9CBCF",
            ],
          },
        ],
      },
    };
  };

  const { categoryChartData } = getChartData();

  const generatePDF = () => {
    const doc = new jsPDF();

    html2canvas(document.querySelector("#chart-container")).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      doc.addImage(imgData, "PNG", 10, 10, 180, 160);

      doc.setFontSize(18);
      doc.text("Financial Report", 14, 180);

      doc.save("financial-report.pdf");
    });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Financial Reports</h2>

      <div className="flex items-center space-x-4">
        <Select value={reportType} onValueChange={setReportType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Report type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="yearly">Yearly</SelectItem>
          </SelectContent>
        </Select>

        <button
          onClick={generatePDF}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Download Report as PDF
        </button>
      </div>

      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        id="chart-container"
      >
        <div>
          <h3 className="text-xl font-bold">Expenses by Category</h3>
          <Pie data={categoryChartData} />
        </div>
        <div>
          <Bar
            data={categoryChartData}
            options={{
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
