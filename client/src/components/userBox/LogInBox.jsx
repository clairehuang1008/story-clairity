import React, { useState } from 'react';
import { requestLogIn } from '../../utils/fetchRequests';
import { useDispatch } from 'react-redux';
import { goToPage, userLogIn } from '../../utils/reducers/pageSlice';
import ReturnHomeButton from '../ReturnHomeButton';

export default function LogInBox() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);
  return (
    <form className='userBox flex-col'>
      <ReturnHomeButton />
      <div className='flex-col'>
        <label for='username'>Username:</label>
        <input
          type='text'
          className='username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className='flex-col'>
        <label for='password'>Password:</label>
        <input
          type='password'
          className='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className='buttons'>
        <button
          className='login'
          onClick={async (e) => {
            e.preventDefault();
            try {
              const res = await requestLogIn({ username, password });
              if (res.err) {
                setMessage(res.err);
              } else {
                setMessage('Login successfully.');
                console.log(res);
                dispatch(userLogIn(res));
                dispatch(goToPage('HOME'));
              }
            } catch (error) {
              console.log(error);
            }
          }}
        >
          Login
        </button>
        <button
          className='signup'
          onClick={(e) => {
            e.preventDefault();
            dispatch(goToPage('SIGN_UP'));
          }}
        >
          Sign up
        </button>
      </div>
      {message && <p className='error'>{message}</p>}
    </form>
  );
}
