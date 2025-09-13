// import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/home';
import Categories from './components/Categories/categories';
import Statistics from './components/Statistics/statistics';
import Settings from './components/Settings/settings';
import Header from './components/Header/header';
import Footer from './components/Footer/footer';
function App() {
  return (
    <Router>
      <div className="bg-gray-100 font-sans flex min-h-screen">
        <Header />
        <div className="flex-1 flex flex-col">
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Categories" element={<Categories />} />
              <Route path="/Statistics" element={<Statistics />} />
              <Route path="/Settings" element={<Settings />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;

