import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InitAuth from './components/InitAuth';
import CheckAuth from './components/CheckAuth';
import LoginPage from './pages/LoginPage';
import CheckUserType from './components/CheckUserType';
import UserMainPage from './pages/user/UserMainPage';
import StoreMainPage from './pages/store/StoreMainPage';
import RequestPage from './pages/user/RequestPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<InitAuth />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/main"
            element={
              <CheckAuth
                component={<CheckUserType first={<UserMainPage />} second={<StoreMainPage />} />}
              />
            }
          />
          <Route path="/request" element={<CheckAuth component={<RequestPage />} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
