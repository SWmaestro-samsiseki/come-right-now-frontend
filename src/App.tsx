import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import RequestPage from './pages/RequestPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/main" element={<MainPage />} />
          <Route path="/request" element={<RequestPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
