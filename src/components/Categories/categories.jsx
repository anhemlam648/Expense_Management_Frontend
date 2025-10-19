import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { FaSave } from "react-icons/fa";
import { MdCancel } from "react-icons/md";


// Sample categories data (temporary)
// const initialCategories = [
//   { id: 1, name: 'Food', type: 'EXPENSE' },
//   { id: 2, name: 'Transportation', type: 'EXPENSE' },
//   { id: 3, name: 'Salary', type: 'INCOME' },
//   { id: 4, name: 'Entertainment', type: 'EXPENSE' },
// ];

const Categories = () => {

  // const [categories, setCategories] = useState(initialCategories);
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [categoryType, setCategoryType] = useState('EXPENSE');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const token = localStorage.getItem("token");

  // Edit Category States
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editType, setEditType] = useState("EXPENSE");


  // Load categories from API
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:8080/api/categories/list", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCategories(res.data);
        setError('');
      } catch (err) {
        console.error(err);
        setError('Failed to load categories');
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      if (token) {
        fetchCategories();
      } else {
        setLoading(false);
        setError('No token found');
      }
    }, [token]);


  // const handleAddCategory = () => {
  //   if (!categoryName) return;

  //   const newCategory = {
  //     id: categories.length + 1, // Simple ID generation
  //     type: categoryType,
  //   };

  //   setCategories([...categories, newCategory]);
  //   setCategoryName('');
  //   setCategoryType('EXPENSE');
  // };

  const handleAddCategory = async () => {
    if (!categoryName.trim()) return;

    try {
      const res = await axios.post(
        "http://localhost:8080/api/categories/add",
        { name: categoryName.trim(), type: categoryType }, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        } 
      );

      if (res.data === true) {
        fetchCategories(); 
        setCategoryName('');
        setCategoryType('EXPENSE');
      } else {
        alert('Failed to add category.');
      }
    } catch (err) {
      console.error(err);
      alert('Error adding category.');
    }
  };
  
  useEffect(() => {
    fetchCategories();
  }, []);

  // const handleDeleteCategory = (id) => {
  //   setCategories(categories.filter((category) => category.id !== id));
  // };

  const handleDeleteCategory = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/categories/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCategories(categories.filter((c) => c.id !== id));
    } catch (err) {
      console.error(err);
      alert('Error deleting category.');
    }
  };

   // Start editing
  const handleEditClick = (category) => {
    setEditingId(category.id);
    setEditName(category.name);
    setEditType(category.type);
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditName("");
    setEditType("EXPENSE");
  };

  // Update Category (PUT API)
  const handleUpdateCategory = async () => {
    if (!editName.trim()) {
      alert("Category name cannot be empty!");
      return;
    }

    try {
      const res = await axios.put(
        `http://localhost:8080/api/categories/${editingId}`,
        { name: editName.trim(), type: editType },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        await fetchCategories();
        handleCancelEdit();
      } else {
        alert("Failed to update category.");
      }
    } catch (err) {
      console.error(err);
      alert("Error updating category.");
    }
  };
  return (
    <div className="p-8">
      <header className="flex justify-between items-center mb-8">
         <h1 className="text-3xl font-bold ml-4 text-green-500 dark:text-green-400">
             Category Management
          </h1>
      </header>

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

      {/* List Categories */}
    
        {/* <div className="bg-white p-6 rounded-lg shadow-md">
           <h2 className="text-lg font-semibold text-gray-700 mb-4">List Categories</h2>
          {loading ? (
              <p>Loading categories...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <div className="space-y-4">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow-md"
                  >
                    <div>
                      <p className="font-semibold text-gray-800">{category.name}</p>
                      <p className="text-sm text-gray-500">{category.type}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        className="text-yellow-500 hover:text-yellow-700 text-sm"
                        onClick={() => alert(`Edit category ${category.name}`)}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700 text-sm"
                        onClick={() => handleDeleteCategory(category.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>  */}
        <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">List Categories</h2>

        {loading ? (
          <p>Loading categories...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : categories.length === 0 ? (
          <p className="text-gray-500">No categories found.</p>
        ) : (
          <div className="space-y-4">
            {categories.map((category) => (
              <div
                key={category.id}
                className="p-4 bg-gray-50 rounded-lg shadow-md flex justify-between items-center"
              >
                {editingId === category.id ? (

                  // Edit Mode
                  <div className="flex-1">
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="border p-1 rounded mr-2"
                    />
                    <select
                      value={editType}
                      onChange={(e) => setEditType(e.target.value)}
                      className="border p-1 rounded mr-2"
                    >
                      <option value="EXPENSE">Expense</option>
                      <option value="INCOME">Income</option>
                    </select>
                    <button
                      className="bg-green-500 text-white px-3 py-1 rounded mr-2 hover:bg-green-600"
                      onClick={handleUpdateCategory}
                    >
                      Save
                    </button>
                    <button
                      className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                      onClick={handleCancelEdit}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  // View Mode
                  <>
                    <div>
                      <p className="font-semibold text-gray-800">{category.name}</p>
                      <p className="text-sm text-gray-500">{category.type}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        className="text-yellow-500 hover:text-yellow-700 text-sm"
                        onClick={() => handleEditClick(category)}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700 text-sm"
                        onClick={() => handleDeleteCategory(category.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
     );
};

export default Categories;
