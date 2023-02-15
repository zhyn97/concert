import './App.css';
import Main from '../main/Main';
import Admin from '../admin/Admin';
import Login from '../login/Login';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const navigate = useNavigate();

  // function tokenCheck() {
  //   if (localStorage.getItem('token')) {
  //     const token = localStorage.getItem('token');
  //     console.log(token);
  //     setLoggedIn(true);
  //     navigate('/admin');
  //   }
  // }

  // useEffect(() => {
  //   tokenCheck();
  // }, [])

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
