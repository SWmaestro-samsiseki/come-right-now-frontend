import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import BranchComponent from './components/brachComponent';
import UserMainPage from './pages/user/UserMainPage';
import StoreMainPage from './pages/store/StoreMainPage';
import RequestPage from './pages/user/RequestPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace={true} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/main"
            element={<BranchComponent first={<UserMainPage />} second={<StoreMainPage />} />}
          />
          <Route path="/request" element={<RequestPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
