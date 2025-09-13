import React, { useState } from 'react';

// Sample settings data (temporary)
const Settings = () => {
  const [theme, setTheme] = useState("light");
  const [notifications, setNotifications] = useState(true);
  const [email, setEmail] = useState("user@gmail.com");

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  };

  const handleNotificationsChange = () => {
    setNotifications(!notifications);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSave = () => {
    alert("Settings saved!");
  };

  return (
    <main className="flex-1 p-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 ml-4">Settings</h1>
      </header>

      {/* User Settings Section */}
      <section className="bg-white p-6 rounded-lg shadow mb-8">
        <h4 className="font-bold text-lg mb-4">User Information</h4>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-500">Email</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </div>
      </section>

      {/* Theme Settings */}
      <section className="bg-white p-6 rounded-lg shadow mb-8">
        <h4 className="font-bold text-lg mb-4">Theme</h4>
        <div>
          <label className="mr-4">
            <input
              type="radio"
              name="theme"
              value="light"
              checked={theme === "light"}
              onChange={handleThemeChange}
              className="mr-2"
            />
            Light Mode
          </label>
          <label>
            <input
              type="radio"
              name="theme"
              value="dark"
              checked={theme === "dark"}
              onChange={handleThemeChange}
              className="mr-2"
            />
            Dark Mode
          </label>
        </div>
      </section>

      {/* Notification Settings */}
      <section className="bg-white p-6 rounded-lg shadow mb-8">
        <h4 className="font-bold text-lg mb-4">Notifications</h4>
        <div>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={notifications}
              onChange={handleNotificationsChange}
              className="form-checkbox h-5 w-5 text-teal-600"
            />
            <span className="ml-2 text-gray-600">Enable email notifications</span>
          </label>
        </div>
      </section>

      {/* Save Button */}
      <div className="bg-white p-6 rounded-lg shadow">
        <button
          onClick={handleSave}
          className="w-full py-2 px-4 bg-teal-600 text-white font-bold rounded hover:bg-teal-700"
        >
          Save Settings
        </button>
      </div>
    </main>
  );
};

export default Settings;
