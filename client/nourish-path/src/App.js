import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Import your page components
import HomePage from './pages/homepage';
import ChatBot from './pages/chatBot';
import Recipes from './pages/recipes';
import Journal from './pages/journals';

function App() {
  return (
    <Router>
      <div>
        {/* Navigation Links */}
        <nav>
          <Link to="/">Home</Link> | 
          <Link to="/chatbot">Chatbot</Link> | 
          <Link to="/recipes">Recipes</Link> | 
          <Link to="/journaling">Journaling</Link>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<HomePage />} exact />
          <Route path="/chatbot" element={<ChatBot />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/journaling" element={<Journal />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
