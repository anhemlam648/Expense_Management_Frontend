import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/home";
import Categories from "./components/Categories/categories";
import Statistics from "./components/Statistics/statistics";
import Settings from "./components/Settings/settings";
import Header from "./components/Header/header";
import Footer from "./components/Footer/footer";
import Login from "./components/Login/login";
import Register from "./components/Register/register";
import PrivateRoute from "./components/Private/privaterouter";
import ThemeProvider, { ThemeContext } from "./components/ThemeContext/themecontext";
import "./App.css";

function AppContent() {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`font-sans flex min-h-screen ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <Header />
      <div className="flex-1 flex flex-col">
        <main className="flex-1">
          <Routes>
            {/* <Route path="/" element={<Home />} />
            <Route path="/Categories" element={<Categories />} />
            <Route path="/Statistics" element={<Statistics />} />
            <Route path="/Settings" element={<Settings />} /> */}
            {/* <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} /> */}
            <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route path="/Categories" element={<PrivateRoute><Categories /></PrivateRoute>} />
            <Route path="/Statistics" element={<PrivateRoute><Statistics /></PrivateRoute>} />
            <Route path="/Settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;
