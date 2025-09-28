import React from 'react';
import { Bar, Doughnut, Line } from 'react-chartjs-2'; // Importing chart components
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from 'chart.js';

// Register chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

// Sample statistics data (temporary)
const monthlySpendingData = {
  labels: ['January', 'February', 'March', 'April', 'May'],
  datasets: [{
    label: 'Spending per Month',
    data: [400, 500, 300, 600, 700],
    backgroundColor: '#3f51b5',
    borderColor: '#3f51b5',
    borderWidth: 1,
    fill: false,
  }],
};

const yearlyExpenseData = {
  labels: ['Q1', 'Q2', 'Q3', 'Q4'],
  datasets: [{
    label: 'Yearly Expense',
    data: [1200, 1500, 1800, 1000],
    backgroundColor: '#FF5722',
    borderColor: '#FF5722',
    borderWidth: 1,
    fill: false,
  }],
};


const Statistics = () => {
  return (
    <main className="flex-1 p-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold ml-4 text-green-500 dark:text-green-400">Statistics Management</h1>
      </header>

      {/* Total */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full mr-2 bg-teal-500"></div>
            <h3 className="text-sm font-medium text-gray-500">Total Income</h3>
          </div>
          <p className="text-2xl font-bold mt-2 text-gray-900 dark:text-gray-100">$2,500</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full mr-2 bg-amber-500"></div>
            <h3 className="text-sm font-medium text-gray-500">Total Expenses</h3>
          </div>
          <p className="text-2xl font-bold mt-2 text-gray-900 dark:text-gray-100">$1,200</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full mr-2 bg-blue-500"></div>
            <h3 className="text-sm font-medium text-gray-500">Remaining Balance</h3>
          </div>
          <p className="text-2xl font-bold mt-2 text-gray-900 dark:text-gray-100">$1,140</p>
        </div>
      </section>

      {/* Chart Income vs Expenses and Contract by Stages */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h4 className="font-bold text-lg mb-4">Monthly Spending Analysis</h4>
            <div className="w-full max-w-[400px] mx-auto">
              <Line data={monthlySpendingData} options={{
                responsive: true,
                maintainAspectRatio: false, 
                plugins: {
                  legend: { display: false },
                  title: { display: true, text: 'Spending per Month' }
                }
              }} />
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
              <h4 className="font-bold text-lg mb-4">Yearly Expense Analysis</h4>
              <div className="w-full max-w-[400px] mx-auto">
                <Bar data={yearlyExpenseData} options={{
                  responsive: true,
                  maintainAspectRatio: false, 
                  plugins: {
                    legend: { display: false },
                    title: { display: true, text: 'Yearly Expense Overview' }
                  }
                }} />
              </div>
          </div>

      </section>
    </main>
  );
};


export default Statistics;
