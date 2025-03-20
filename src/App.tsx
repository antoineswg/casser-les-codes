import './index.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from 'react';


import Home from './pages/Home';
import About from './pages/About';
import Booking from './pages/Booking.jsx';
import Navbar from './components/Navbar';

function App() {

  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'fr';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const [currentPage, setCurrentPage] = useState(() => {
    return localStorage.getItem('currentPage') || '';
  });

  useEffect(() => {
    localStorage.setItem('currentPage', currentPage);
  }, [currentPage]);


    return (
<Router>
      <Navbar language={language} setLanguage={setLanguage} currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <div>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/about" element={<About />} />
          <Route path="/booking" element={<Booking />} />
        </Routes>
      </div>
      
    </Router>
    );
}

export default App