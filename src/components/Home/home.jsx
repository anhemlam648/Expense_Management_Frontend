import React from 'react';
import { Bar, Doughnut } from 'react-chartjs-2'; // Import chart
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const contractByStagesData = {
  labels: ['Income', 'Food', 'Transportation', 'Entertainment'],
  datasets: [{
    label: 'Contracts',
    data: [350, 200, 450, 150],
    backgroundColor: ['#2dd4bf', '#fbbf24', '#f87171', '#9ca3af'],
    borderColor: ['#2dd4bf', '#fbbf24', '#f87171', '#9ca3af'],
    borderWidth: 1,
    borderRadius: 4,
    barThickness: 30,
  }],
};

const contractExpiringData = {
  labels: ['Within 60 days', 'Within 30 days', 'Expired'],
  datasets: [{
    data: [45, 25, 30],
    backgroundColor: ['#2dd4bf', '#fbbf24', '#f87171'],
    hoverBackgroundColor: ['#14b8a6', '#f59e0b', '#ef4444'],
    borderColor: '#fff',
    borderWidth: 4,
  }],
};

const Home = () => {
  return (
    <main className="flex-1 p-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 ml-4">Expense Management</h1>
      </header>

      {/* Total */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full mr-2 bg-teal-500"></div>
            <h3 className="text-sm font-medium text-gray-500">Total Income</h3>
          </div>
          <p className="text-2xl font-bold mt-2">$2,500</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full mr-2 bg-amber-500"></div>
            <h3 className="text-sm font-medium text-gray-500">Total Expenses</h3>
          </div>
          <p className="text-2xl font-bold mt-2">$1,200</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full mr-2 bg-blue-500"></div>
            <h3 className="text-sm font-medium text-gray-500">Remaining Balance</h3>
          </div>
          <p className="text-2xl font-bold mt-2">$1,140</p>
        </div>
      </section>

      {/* Chart Income vs Expenses and Contract by Stages */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h4 className="font-bold text-lg mb-4">Income vs Expenses</h4>
          <div className="w-full max-w-[400px] mx-auto">
            <Doughnut data={contractExpiringData} options={{ responsive: true, plugins: { legend: { position: 'bottom' } } }} />
          </div>
        </div>
      </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h4 className="font-bold text-lg mb-4">Contract by Stages</h4>
          <div className="w-full h-56">
            {/* <Bar data={contractByStagesData} options={{ responsive: true, plugins: { legend: { display: false } } }} /> */}
              <Bar data={contractByStagesData} options={{
                responsive: true, 
                plugins: { legend: { display: false } },
                scales: 
                {x: {
                    ticks: {
                      maxRotation: 90,
                      minRotation: 45,
                      font: {
                        size: 15 // increase font size for x-axis labels, 
                      }
                    }
                  },
                  y: {
                    ticks: {
                      display: false // hide y-axis labels
                    }
                  }
                }
              }} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h4 className="font-bold text-lg mb-4">Expenses by Category</h4>
          {/* Expenses Category Table */}
          <table className="w-full text-left">
            <thead>
              <tr className="text-sm text-gray-500 border-b">
                <th className="py-2 font-medium">Category</th>
                <th className="py-2 font-medium">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-4 text-gray-600">Food</td>
                <td className="py-4 text-gray-800">$500</td>
              </tr>
              <tr className="border-b">
                <td className="py-4 text-gray-600">Transportation</td>
                <td className="py-4 text-gray-800">$400</td>
              </tr>
              <tr className="border-b">
                <td className="py-4 text-gray-600">Entertainment</td>
                <td className="py-4 text-gray-800">$300</td>
              </tr>
              <tr className="border-b">
                <td className="py-4 text-gray-600">Bills</td>
                <td className="py-4 text-gray-800">$200</td>
              </tr>
              {/* You can add more categories as needed */}
            </tbody>
          </table>
      </div>
      </section>

      

    </main>
  );
};

export default Home;
