import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import api from '../../utilities/api';
import WaringPopUp from "../warningPopUp/WarningPopUp.js";


function Login({ setLoggedIn }) {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    login: "",
    password: ""
  });
  const [active, setActive] = useState(false);

  function tokenCheck() {
    if (localStorage.getItem('token')) {
      setLoggedIn(true);
      navigate('/admin');
    }
  }

  function handleChangeName(event) {
    setUserData(prevState => {
      return { ...prevState, ...{ login: event.target.value } };
    });
  }

  function handleChangePassword(event) {
    setUserData(prevState => {
      return { ...prevState, ...{ password: event.target.value } };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    api.login(userData)
      .then(res => {
        if (res.token) {
          localStorage.setItem('token', res.token);
          setLoggedIn(true);
          navigate("/admin", { replace: true });
          return res;
        }
      })
      .catch(error => {
        console.log(error);
        isActivePopUp();
      });
  }

  function isActivePopUp() {
    setActive(true);
    setTimeout(() => {
      setActive(false);
    }, 3000);
  }

  useEffect(() => {
    tokenCheck();
  }, [])

  return (
    <>
      <form className="login" onSubmit={handleSubmit}>
        <p className="login_header">Login to the control panel</p>
        <input className="login_field" type="text" placeholder="Login" value={userData.login} onChange={handleChangeName} />
        <input className="login_field" type="text" placeholder="Password" value={userData.password} onChange={handleChangePassword} />
        <input className="login_button" type="submit" value="Send" />
      </form>
      <WaringPopUp active={active} content={
        <p className="warning_text">Incorrect username or password</p>
      }/>
    </>
  );
}

export default Login;