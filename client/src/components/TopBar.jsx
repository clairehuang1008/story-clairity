import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './TopBar.scss';
import {
  goToPage,
  setUserDetailId,
  userLogOut,
} from '../utils/reducers/pageSlice';
import { PersonVCard } from '../../public/icons';

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
          <PersonVCard />
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
