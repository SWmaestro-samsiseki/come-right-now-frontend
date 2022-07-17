import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/main" element={<MainPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
