import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { requestSignUp } from '../../utils/fetchRequests';
import { goToPage, userLogIn } from '../../utils/reducers/pageSlice';
import ReturnHomeButton from '../ReturnHomeButton';

export default function SignUpBox() {
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
        {' '}
        <button
          className='signup'
          onClick={async (e) => {
            e.preventDefault();
            try {
              const res = await requestSignUp({ username, password });
              if (res.err) {
                setMessage(res.err);
              } else {
                setMessage('Sign up successfully.');
                dispatch(userLogIn(res));
                console.log(res);
                setTimeout(() => dispatch(goToPage('HOME')), 1000);
              }
            } catch (error) {
              console.log(error);
            }
          }}
        >
          Sign up
        </button>
      </div>
      {message && <p className='error'>{message}</p>}
    </form>
  );
}
