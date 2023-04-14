import React from "react";
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from '../src/Components/Login';
import Signup from '../src/Components/Signup';
import Dashboard from '../src/Components/Dashboard';
import Calculator from "../src/Components/Calculator";

const App = () => {

  return (
    <div className="App">
      <h1>Calculator</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>

    </div >
  )
};

export default App;