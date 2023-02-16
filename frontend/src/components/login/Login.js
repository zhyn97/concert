import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';


function Login({ setLoggedIn }) {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    login: "",
    password: ""
  });

  function tokenCheck() {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      console.log(token);
      setLoggedIn(true);
      navigate('/admin');
    }
  }
  
  function handleChangeName(event) {
    setUserData(prevState => {
      return {...prevState, ...{login: event.target.value}};
    });
  }

  function handleChangePassword(event) {
    setUserData(prevState => {
      return {...prevState, ...{password: event.target.value}};
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    fetch("http://195.133.147.210/api/login/", {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData)
    })
    .then(res => res.json())
    .then(res => {
      if(res.token){
        localStorage.setItem('token', res.token);
        setLoggedIn(true);
        navigate("/admin", {replace: true});
        console.log('you are admin');
        console.log(res);
        return res;
      } else {
        console.log('you are not admin');
        return
      }
    })
    .catch(error => console.log(error));
  }

  useEffect(() => {
    tokenCheck();
  }, [])

  return (
    <form  className="login" onSubmit={handleSubmit}>
      <p className="login_header">Login to the control panel</p>
      <input className="login_field" type="text" placeholder="Login" value={userData.login} onChange={handleChangeName} />
      <input className="login_field" type="text" placeholder="Password" value={userData.password} onChange={handleChangePassword} />
      <input className="login_button" type="submit" value="Send" />
    </form>
  );
}

export default Login;