import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Transaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [openDetails, setOpenDetails] = useState(null); // track transaction id đang mở
  const token = localStorage.getItem('token');

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      if (!token) return;
      try {
        const res = await axios.get('http://localhost:8080/api/categories/list', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCategories(res.data);
      } catch (err) {
        console.error('Failed to fetch categories:', err);
      }
    };
    fetchCategories();
  }, [token]);

  // Fetch transactions
  useEffect(() => {
    const fetchTransactions = async () => {
      if (!token) return;
      try {
        const res = await axios.get('http://localhost:8080/api/transaction/list', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTransactions(res.data);
      } catch (err) {
        console.error('Failed to fetch transactions:', err);
      }
    };
    fetchTransactions();
  }, [token]);

  if (!transactions.length) {
    return <p className="text-gray-500 text-center mt-8">No transactions found.</p>;
  }

  const getCategoryInfo = (categoryId) => {
    const cat = categories.find((c) => c.id === categoryId);
    return cat ? { name: cat.name, type: cat.type } : { name: 'Unknown', type: 'UNKNOWN' };
  };

  const toggleDetails = (id) => {
    setOpenDetails(openDetails === id ? null : id);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
       <header className="flex justify-between items-center mb-8">
         <h1 className="text-3xl font-bold ml-4 text-green-500 dark:text-green-400">
            Transaction Management
          </h1>
        </header>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {transactions.map((t) => {
          const categoryInfo = getCategoryInfo(t.categoryId);
          const isIncome = categoryInfo.type === 'INCOME';
          const isOpen = openDetails === t.id;

          return (
            <div
              key={t.id}
              className="bg-white shadow-md rounded-lg p-5 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm text-gray-500">
                  {new Date(t.date).toLocaleDateString()}
                </span>
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    isIncome ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}
                >
                  {categoryInfo.type}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{categoryInfo.name}</h3>
              <p className={`text-xl font-bold ${isIncome ? 'text-green-600' : 'text-red-600'}`}>
                {isIncome ? '+' : '-'}${t.amount.toLocaleString()}
              </p>

              {/* Details transaction */}
              <button
                onClick={() => toggleDetails(t.id)}
                className="mt-3 text-sm text-blue-600 hover:underline"
              >
                {isOpen ? 'Hide Details' : 'View Details'}
              </button>

              {/* Details transaction */}
              {isOpen && (
                <div className="mt-3 border-t pt-3 text-gray-600 text-sm space-y-1">
                  <p><strong>Note:</strong> {t.note || '—'}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Transaction;
