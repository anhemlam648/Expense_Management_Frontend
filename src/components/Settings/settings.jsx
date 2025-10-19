import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { ThemeContext } from "../ThemeContext/themecontext";

const Settings = () => {
  const token = localStorage.getItem("token");
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const { theme, setTheme } = useContext(ThemeContext); 
  const [selectedTheme, setSelectedTheme] = useState(theme); 
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


  useEffect(() => {
    setSelectedTheme(theme);
  }, [theme]);

  // Avatar initials
  const getInitial = () => {
    if (user?.email && user.email.trim().length > 0) {
      return user.email.charAt(0).toUpperCase();
    }
    return "U";
  };

  const handleThemeChange = (e) => {
    setSelectedTheme(e.target.value);
  };

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

      setTheme(selectedTheme);
    } catch (error) {
      setMessage(
        error.response?.data || "Failed to save settings. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // const handleSave = async () => {
  //     setTheme(selectedTheme); //Test
  //     setLoading(false);
  //     setMessage("Settings saved successfully!");
  // };

  return (
    <div
      className={`flex-1 min-h-screen py-8 px-4 sm:px-6 lg:px-8 ${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-gray-100 text-gray-900"
      }`}
    >
      <div className="max-w-3xl mx-auto w-full">
        <header className="mb-10 text-center">
          <h1 className="text-3xl font-bold ml-4 text-green-500 dark:text-green-400">
            Profile Settings
          </h1>
          <p
            className={`mt-2 text-sm sm:text-base ${
              theme === "dark" ? "text-gray-300" : "text-gray-500"
            }`}
          >
            Manage your profile and preferences
          </p>
        </header>

        {/* Profile Section */}
        {user ? (
          <section
            className={`p-6 sm:p-8 rounded-xl shadow-md mb-8 ${
              theme === "dark" ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-teal-400 to-teal-600 text-white rounded-full shadow-lg flex items-center justify-center text-3xl sm:text-4xl font-bold mb-4">
                {getInitial()}
              </div>  

              {/* Editable username */}
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={`text-xl sm:text-2xl font-semibold border-b-2 focus:outline-none px-1 mb-2 text-center w-full max-w-xs ${
                  theme === "dark"
                    ? "text-white border-teal-400 bg-gray-900"
                    : "text-gray-800 border-teal-600 bg-white"
                }`}
                placeholder="Enter your username"
              />

              <p
                className={`text-sm sm:text-base ${
                  theme === "dark" ? "text-gray-300" : "text-gray-500"
                }`}
              >
                {user.email}
              </p>
            </div>
          </section>
        ) : (
          <p className="text-center text-gray-500 mb-8">Loading profile...</p>
        )}  

        {/* Theme Settings */}
        <section
          className={`p-6 rounded-xl shadow mb-8 ${
            theme === "dark" ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h4
            className={`text-lg font-bold mb-4 ${
              theme === "dark" ? "text-white" : "text-gray-800"
            }`}
          >
            Theme Preference
          </h4>
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-8">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="theme"
                value="light"
                checked={selectedTheme === "light"}
                onChange={handleThemeChange}
                className="text-teal-600 focus:ring-teal-500"
              />
              <span
                className={`${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Light Mode
              </span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="theme"
                value="dark"
                checked={selectedTheme === "dark"}
                onChange={handleThemeChange}
                className="text-teal-600 focus:ring-teal-500"
              />
              <span
                className={`${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Dark Mode
              </span>
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
