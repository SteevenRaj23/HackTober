import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const spendingData = [
  { name: "Bills", value: 35, color: "#3b82f6" },
  { name: "Shopping", value: 25, color: "#10b981" },
  { name: "Entertainment", value: 15, color: "#f59e0b" },
  { name: "Transportation", value: 15, color: "#ef4444" },
  { name: "Food & Dining", value: 10, color: "#8b5cf6" },
];

const incomeExpensesData = [
  { month: "Jan", income: 4000, expenses: 2500 },
  { month: "Feb", income: 4500, expenses: 2800 },
  { month: "Mar", income: 4200, expenses: 2600 },
  { month: "Apr", income: 4800, expenses: 2700 },
  { month: "May", income: 5000, expenses: 3000 },
  { month: "Jun", income: 4700, expenses: 2900 },
  { month: "Jul", income: 5200, expenses: 3100 },
  { month: "Aug", income: 4900, expenses: 3000 },
  { month: "Sep", income: 5300, expenses: 3200 },
  { month: "Oct", income: 5500, expenses: 3300 },
  { month: "Nov", income: 5400, expenses: 3400 },
  { month: "Dec", income: 5600, expenses: 3500 },
];

const ChartsSection = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
      {/* Spending Overview */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-gray-700">Spending Overview</h2>
          <select className="border px-2 py-1 rounded">
            <option>Last 30 days</option>
            <option>Last 3 months</option>
            <option >Last year</option>
          </select>
        </div>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={spendingData}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              label={(entry) => `${entry.name}: ${entry.value}%`}
            >
              {spendingData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Income vs Expenses */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-gray-700">Income vs Expenses</h2>
          <select className="border px-2 py-1 rounded">
            <option>This year</option>
            <option>Last year</option>
          </select>
        </div>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={incomeExpensesData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="income" fill="#10b981" />
            <Bar dataKey="expenses" fill="#ef4444" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartsSection;
