import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CheckUser from './components/CheckUser';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import RequestPage from './pages/RequestPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace={true} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/main"
            element={
              <CheckUser>
                <MainPage />
              </CheckUser>
            }
          />
          <Route path="/request" element={<RequestPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
