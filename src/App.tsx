import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import BranchComponent from './components/brachComponent';
import UserMainPage from './pages/UserMainPage';
import StoreMainPage from './pages/StoreMainPage';
import RequestPage from './pages/RequestPage';
import useAuthStore from './store/authStore';

function App() {
  const { authoried } = useAuthStore();

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace={true} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/main"
            element={
              authoried ? (
                <BranchComponent
                  UserMainPage={<UserMainPage />}
                  StoreMainPage={<StoreMainPage />}
                />
              ) : (
                <LoginPage />
              )
            }
          />
          <Route path="/request" element={<RequestPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
