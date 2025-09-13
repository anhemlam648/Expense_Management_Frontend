import React from 'react';
import { useState } from 'react';

// Sample categories data (temporary)
const initialCategories = [
  { id: 1, name: 'Food', type: 'EXPENSE' },
  { id: 2, name: 'Transportation', type: 'EXPENSE' },
  { id: 3, name: 'Salary', type: 'INCOME' },
  { id: 4, name: 'Entertainment', type: 'EXPENSE' },
];


const Categories = () => {
  const [categories, setCategories] = useState(initialCategories);
  const [categoryName, setCategoryName] = useState('');
  const [categoryType, setCategoryType] = useState('EXPENSE');

  const handleAddCategory = () => {
    if (!categoryName) return;

    const newCategory = {
      id: categories.length + 1, // Simple ID generation
      type: categoryType,
    };

    setCategories([...categories, newCategory]);
    setCategoryName('');
    setCategoryType('EXPENSE');
  };

  const handleDeleteCategory = (id) => {
    setCategories(categories.filter((category) => category.id !== id));
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Manage Categories</h1>

      {/* Form Add Category */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Add Category</h2>
        <div className="mb-4">
          <label htmlFor="categoryName" className="block text-sm text-gray-600">Category Name</label>
          <input
            type="text"
            id="categoryName"
            className="w-full p-2 border rounded-md mt-1"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Enter category name"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="categoryType" className="block text-sm text-gray-600">Category Type</label>
          <select
            id="categoryType"
            className="w-full p-2 border rounded-md mt-1"
            value={categoryType}
            onChange={(e) => setCategoryType(e.target.value)}
          >
            <option value="EXPENSE">Expense</option>
            <option value="INCOME">Income</option>
          </select>
        </div>
        <button
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          onClick={handleAddCategory}
        >
          Add Category
        </button>
      </div>

     {/* Category List */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">List Categories</h2>
        
        {/* Display */}
        <div className="space-y-4">
          {categories.map((category) => (
            <div key={category.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow-md">
              <div>
                <p className="font-semibold text-gray-800">{category.name}</p>
                <p className="text-sm text-gray-500">{category.type}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  className="text-yellow-500 hover:text-yellow-700 text-sm"
                  onClick={() => alert(`Edit category ${category.name}`)} // Edit
                >
                  Edit
                </button>
                <button
                  className="text-red-500 hover:text-red-700 text-sm"
                  onClick={() => handleDeleteCategory(category.id)} // Delete
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
