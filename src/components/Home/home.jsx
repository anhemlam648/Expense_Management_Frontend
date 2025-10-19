import React from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const contractByStagesData = {
  labels: ['Income', 'Food', 'Transportation', 'Entertainment'],
  datasets: [
    {
      label: 'Contracts',
      data: [350, 200, 450, 150],
      backgroundColor: ['#0ea5e9', '#06b6d4', '#14b8a6', '#2dd4bf'],
      borderColor: ['#0ea5e9', '#06b6d4', '#14b8a6', '#2dd4bf'],
      borderWidth: 1,
      borderRadius: 6,
      barThickness: 30,
    },
  ],
};

const contractExpiringData = {
  labels: ['Income', 'Expenses', 'Balance'],
  datasets: [
    {
      data: [2500, 1200, 1140],
      backgroundColor: ['#0ea5e9', '#14b8a6', '#06b6d4'],
      hoverBackgroundColor: ['#38bdf8', '#2dd4bf', '#22d3ee'],
      borderColor: '#fff',
      borderWidth: 4,
    },
  ],
};

const Home = () => {
  return (
    <main
      className="flex-1 p-8 min-h-screen bg-gradient-to-br from-sky-100 via-teal-50 to-emerald-100"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-teal-500 to-emerald-500 ml-4">
          Expense Management
        </h1>
      </header>

      {/* Totals */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-sky-400 hover:shadow-xl transition">
          <h3 className="text-sm font-medium text-gray-500">Total Income</h3>
          <p className="text-3xl font-bold mt-2 text-sky-600">$2,500</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-teal-400 hover:shadow-xl transition">
          <h3 className="text-sm font-medium text-gray-500">Total Expenses</h3>
          <p className="text-3xl font-bold mt-2 text-teal-600">$1,200</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-emerald-400 hover:shadow-xl transition">
          <h3 className="text-sm font-medium text-gray-500">Remaining Balance</h3>
          <p className="text-3xl font-bold mt-2 text-emerald-600">$1,140</p>
        </div>
      </section>

      {/* Charts */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Doughnut Chart */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h4 className="font-bold text-lg mb-4 text-gray-800">Income vs Expenses</h4>
          <div className="w-full max-w-[400px] mx-auto">
            <Doughnut
              data={contractExpiringData}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: 'bottom' },
                },
              }}
            />
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h4 className="font-bold text-lg mb-4 text-gray-800">Contract by Stages</h4>
          <div className="h-[300px]">
            <Bar
              data={contractByStagesData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                  x: {
                    ticks: { color: '#4b5563' },
                  },
                  y: {
                    ticks: { color: '#9ca3af' },
                  },
                },
              }}
            />
          </div>
        </div>

        {/* Table */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg">
          <h4 className="font-bold text-lg mb-4 text-gray-800">Expenses by Category</h4>
          <table className="w-full text-left border-t border-gray-200">
            <thead>
              <tr className="text-sm text-gray-500 border-b">
                <th className="py-3 font-semibold">Category</th>
                <th className="py-3 font-semibold">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-gray-50 transition">
                <td className="py-3 text-gray-600">Food</td>
                <td className="py-3 text-gray-800">$500</td>
              </tr>
              <tr className="border-b hover:bg-gray-50 transition">
                <td className="py-3 text-gray-600">Transportation</td>
                <td className="py-3 text-gray-800">$400</td>
              </tr>
              <tr className="border-b hover:bg-gray-50 transition">
                <td className="py-3 text-gray-600">Entertainment</td>
                <td className="py-3 text-gray-800">$300</td>
              </tr>
              <tr className="hover:bg-gray-50 transition">
                <td className="py-3 text-gray-600">Bills</td>
                <td className="py-3 text-gray-800">$200</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
};

export default Home;
