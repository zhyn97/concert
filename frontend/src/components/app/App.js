import './App.css';
import Main from '../main/Main';
import Admin from '../admin/Admin';
import Login from '../login/Login';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <>
      <Routes>
        <Route path="/sergei" element={<Main />} />
        <Route path="/admin" element={loggedIn ? <Admin /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
        <Route path="/" element={<Navigate to="/sergei" />} />
      </Routes>
    </>
  );
}

export default App;
