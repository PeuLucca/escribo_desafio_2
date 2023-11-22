// Core
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";

// Screens
import Login from "./Login";
import Cadastro from "./Cadastro";

function App() {
  return (
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Navigate to="/login" replace />}
          />
          <Route path="/login" element={<Login />}/>
          <Route path="/cadastro" element={<Cadastro />} />
        </Routes>
      </Router>
  );
}

export default App;
