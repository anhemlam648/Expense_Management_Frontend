import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Settings = () => {
  const token = localStorage.getItem('token');
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState("light");
  const [notifications, setNotifications] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data);
      } catch (err) {
        console.error("Failed to load user profile:", err);
      }
    };

    if (token) {
      fetchUserProfile();
    }
  }, [token]);

  const getInitial = () => {
    if (user?.email && user.email.trim().length > 0) {
      return user.email.charAt(0).toUpperCase();
    }
    return 'U';
  };

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  };

  const handleNotificationsChange = () => {
    setNotifications(!notifications);
  };

  const handleSave = () => {
    alert("Settings saved!");
  };

  return (
    <main className="flex-1 bg-gradient-to-br from-gray-50 min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-gray-800">User Profile Settings</h1>
          <p className="text-gray-500 mt-2">Manage your profile and preferences</p>
        </header>

        {/* User Profile */}
        {user ? (
          <section className="bg-white p-8 rounded-xl shadow-md mb-8 text-center">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-gradient-to-br from-teal-400 to-teal-600 text-white rounded-full shadow-lg flex items-center justify-center text-4xl font-bold mb-4">
                {getInitial()}
              </div>
              <p className="text-2xl font-semibold text-gray-800">{user.username}</p>
              <p className="text-gray-500">{user.email}</p>
            </div>
          </section>
        ) : (
          <p className="text-center text-gray-500 mb-8">Loading profile...</p>
        )}

        {/* Theme Settings */}
        <section className="bg-white p-6 rounded-xl shadow mb-8">
          <h4 className="text-lg font-bold text-gray-800 mb-4">Theme Preference</h4>
          <div className="flex items-center space-x-8">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="theme"
                value="light"
                checked={theme === "light"}
                onChange={handleThemeChange}
                className="text-teal-600 focus:ring-teal-500"
              />
              <span className="text-gray-600">Light Mode</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="theme"
                value="dark"
                checked={theme === "dark"}
                onChange={handleThemeChange}
                className="text-teal-600 focus:ring-teal-500"
              />
              <span className="text-gray-600">Dark Mode</span>
            </label>
          </div>
        </section>

        {/* Notification Settings */}
        <section className="bg-white p-6 rounded-xl shadow mb-8">
          <h4 className="text-lg font-bold text-gray-800 mb-4">Notifications</h4>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={notifications}
              onChange={handleNotificationsChange}
              className="form-checkbox h-5 w-5 text-teal-600"
            />
            <span className="ml-3 text-gray-600">Enable email notifications</span>
          </label>
        </section>

        {/* Save Button */}
        <div className="text-center">
          <button
            onClick={handleSave}
            className="inline-block bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-3 rounded-lg shadow transition-all duration-200"
          >
            Save Settings
          </button>
        </div>
      </div>
    </main>
  );
};

export default Settings;
