import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/login';
import Signup from './pages/signup';
import Dashboard from './pages/dashboard';
import PrivateRoute from './components/privateRoutes';
import { AuthProvider } from './context/authContext';

function App() {
  return (
      <AuthProvider>
          <Router>
              <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Signup />} />
                  <Route
                      path="/dashboard"
                      element={
                          <PrivateRoute>
                              <Dashboard />
                          </PrivateRoute>
                      }
                  />
              </Routes>
          </Router>
      </AuthProvider>
  );
}

export default App;
