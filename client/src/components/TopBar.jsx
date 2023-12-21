import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './TopBar.scss';
import {
  goToPage,
  setUserDetailId,
  userLogOut,
} from '../utils/reducers/pageSlice';

export default function TopBar() {
  const loggedUser = useSelector((state) => state.status.loggedUser);
  // const user = { username: 'claire' };
  return (
    <div className='topbar'>
      {!loggedUser && <Buttons />}
      {loggedUser && (
        <User username={loggedUser.username} id={loggedUser._id} />
      )}
    </div>
  );
}

function Buttons() {
  const dispatch = useDispatch();
  return (
    <div className='buttons flex-row'>
      <button className='login' onClick={() => dispatch(goToPage('LOG_IN'))}>
        Login
      </button>
      <button className='signup' onClick={() => dispatch(goToPage('SIGN_UP'))}>
        Sign up
      </button>
    </div>
  );
}

function User({ username, id }) {
  const dispatch = useDispatch();
  return (
    <div className='buttons flex-row'>
      <button className='login'>
        <div
          className='flex-row user'
          onClick={() => {
            dispatch(setUserDetailId(id));
            dispatch(goToPage('USER_DETAIL'));
          }}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='20'
            height='20'
            fill='currentColor'
            className='bi bi-person-vcard-fill'
            viewBox='0 0 16 16'
          >
            <path d='M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm9 1.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 0-1h-4a.5.5 0 0 0-.5.5M9 8a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 0-1h-4A.5.5 0 0 0 9 8m1 2.5a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 0-1h-3a.5.5 0 0 0-.5.5m-1 2C9 10.567 7.21 9 5 9c-2.086 0-3.8 1.398-3.984 3.181A1 1 0 0 0 2 13h6.96c.026-.163.04-.33.04-.5M7 6a2 2 0 1 0-4 0 2 2 0 0 0 4 0' />
          </svg>
          {username}
        </div>
      </button>
      <button
        className='signup'
        onClick={() => {
          dispatch(userLogOut());
          dispatch(goToPage('HOME'));
        }}
      >
        Log out
      </button>
    </div>
  );
}
