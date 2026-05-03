import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}
import Home from './pages/Home';
import Project from './pages/Project';
import Contact from './pages/Contact';
import JoinUs from './pages/JoinUs';
import Privacy from './pages/Privacy';
import Loader from './components/Loader';
export default function App() {
  return (
    <Router>
      <Loader />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work/:id" element={<Project />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/join" element={<JoinUs />} />
        <Route path="/privacy" element={<Privacy />} />
      </Routes>
    </Router>
  );
}
