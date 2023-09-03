import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import { UserContext } from '../../Context/UserContext.js';
import { getItemFromLS, setItemsInLS } from '../../Token/script.js';
import UserProfile from './UserProfile';
import axiosConnect from '../../Token/axios.js';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const { user, signin } = useContext(UserContext);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const { data } = await axiosConnect.post('user/signin', {
        email,
        password,
      });

      signin(data.user);
      setItemsInLS('token', data.token);
      axiosConnect.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${getItemFromLS('token')}`;

      toast.success('SignIn successfull!');
      setRedirect(true);
    }
    catch (err) {
      if (err.response) {
        const { message } = err.response.data;
        toast.error(message);
      } else if (err.request) {
        toast.error(err.request);
      } else {
        console.log('Error: ', err.message);
      }
    }
  }

  if (redirect) {
    return navigate("/");
  }

  if (user) {
    return <UserProfile />;
  }


  return (
    <div>
      <h2 className="App heading-login">Welcome Back!</h2>

      <div className="main-card-style">

        <form className="px-4 py-3" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input type="email" className="form-control inp-bar" id="email" placeholder="Email"
              value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control inp-bar" id="password" placeholder="Password"
              value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="mb-3">
          </div>
          <div className="btn-login">
            <button type="submit" className="btn-sign">Sign In</button>
          </div>
          <div>
            <div className="dropdown-divider"></div>
            <span className="dropdown-item heading-login App" href="">New around here? <Link className="text-decor" to={"/signup"}> Sign Up</Link></span>
          </div>
        </form>


      </div>
    </div>
  );
}

export default SignIn;