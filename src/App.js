import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import ToastConfig from "./components/ToastConfig";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddPet from "./pages/AddPet";
import DeviceManagement from "./pages/DeviceManagement";

function App() {
  const isAuthenticated = () => {
    return localStorage.getItem("token") !== null;
  };

  return (
    <Router>
      <div className="App">
        <ToastConfig />
        <Routes>
          <Route
            path="/login"
            element={
              !isAuthenticated() ? <Login /> : <Navigate to="/dashboard" />
            }
          />
          <Route
            path="/register"
            element={
              !isAuthenticated() ? <Register /> : <Navigate to="/dashboard" />
            }
          />
          <Route
            path="/dashboard"
            element={
              isAuthenticated() ? <Dashboard /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/add-pet"
            element={isAuthenticated() ? <AddPet /> : <Navigate to="/login" />}
          />
          <Route
            path="/devices"
            element={
              isAuthenticated() ? (
                <DeviceManagement />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
