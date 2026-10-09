import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { handleError, handleSuccess } from '../utils'

function Login() {

  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: ''
  })

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(name , value)
    const copyLoginInfo = { ...loginInfo };
    copyLoginInfo[name] = value;
    setLoginInfo(copyLoginInfo)
    // console.log(copyLoginInfo)
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
      return handleError("email and password are required.");
    }
    try {
      const url = 'http://localhost:500/auth/login';
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "Application/json" },
        body: JSON.stringify(loginInfo)
      })
      const result = await response.json();
      // console.log(result)
      const { success, jwtToken, name ,  message, error } = result;
      if (success) {
        handleSuccess(message);
        localStorage.setItem('token' , jwtToken);
        localStorage.setItem('loggedInUser' , name)
        setTimeout(() => {
          navigate('/home')
        }, 1000)
      } else {
        handleError(error || message);
      }

    } catch (error) {
      handleError(error)
    }
  }

  return (
    <div className='container'>
      <h1>Login</h1>
      <form onSubmit={handleLogin }>
        
        <div>
          <label htmlFor='email'>Email</label>
          <input onChange={handleChange} value={loginInfo.email} type='email' name='email' placeholder='Enter your email...' />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input onChange={handleChange} value={loginInfo.password} type='password' name='password' placeholder='Enter your password...' />
        </div>
        <button>Login</button>
        <span>Don't have an account ?
          <Link to="/signup">Signup</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  )
}


export default Login