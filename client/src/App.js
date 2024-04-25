import React from 'react';
import {Routes, BrowserRouter as Router, Route, Link, Navigate } from 'react-router-dom';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Home from "./Home";
import { AuthProvider, useAuth } from './AuthContext';

function App() {
  return (
    <AuthProvider>
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </Router>
  </AuthProvider>
  );
}

function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/signin" />;
}

export default App;
