import React, { useEffect, useState } from "react";
import axios from "axios";

const Settings = () => {
  const token = localStorage.getItem("token");
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [theme, setTheme] = useState("light");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  // Fetch user profile
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data);
        setUsername(res.data.username || "");
      } catch (error) {
        console.error("Failed to load user profile:", error);
      }
    };

    if (token) {
      fetchUserProfile();
    }
  }, [token]);

  // Avatar initials
  const getInitial = () => {
    if (user?.email && user.email.trim().length > 0) {
      return user.email.charAt(0).toUpperCase();
    }
    return "U";
  };

  // Save setting
  const handleSave = async () => {
    if (!username.trim()) {
      setMessage("Username cannot be empty.");
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const res = await axios.put(
        "http://localhost:8080/api/user/update/profile",
        { username: username.trim() },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser(res.data);
      setMessage("Settings saved successfully!");
    } catch (error) {
      setMessage(
        error.response?.data || "Failed to save settings. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto w-full">
        <header className="mb-10 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
            Profile Settings
          </h1>
          <p className="text-gray-500 mt-2 text-sm sm:text-base">
            Manage your profile and preferences
          </p>
        </header>

        {/* Profile Section */}
        {user ? (
          <section className="bg-white p-6 sm:p-8 rounded-xl shadow-md mb-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-teal-400 to-teal-600 text-white rounded-full shadow-lg flex items-center justify-center text-3xl sm:text-4xl font-bold mb-4">
                {getInitial()}
              </div>

              {/* Editable username */}
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="text-xl sm:text-2xl font-semibold text-gray-800 border-b-2 border-teal-600 focus:outline-none px-1 mb-2 text-center w-full max-w-xs"
                placeholder="Enter your username"
              />

              <p className="text-gray-500 text-sm sm:text-base">{user.email}</p>
            </div>
          </section>
        ) : (
          <p className="text-center text-gray-500 mb-8">Loading profile...</p>
        )}

        {/* Theme Settings */}
        <section className="bg-white p-6 rounded-xl shadow mb-8">
          <h4 className="text-lg font-bold text-gray-800 mb-4">Theme Preference</h4>
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-8">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="theme"
                value="light"
                checked={theme === "light"}
                // onChange={handleThemeChange}
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
                // onChange={handleThemeChange}
                className="text-teal-600 focus:ring-teal-500"
              />
              <span className="text-gray-600">Dark Mode</span>
            </label>
          </div>
        </section>

        {/* Save Button */}
        <div className="text-center">
          <button
            onClick={handleSave}
            disabled={loading}
            className="inline-block bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-3 rounded-lg shadow transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
          >
            {loading ? "Saving..." : "Save Settings"}
          </button>
          {message && (
            <p
              className={`mt-3 text-sm font-medium ${
                message.toLowerCase().includes("success")
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
