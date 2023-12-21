// import logo from '../assets/logos/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import './Welcome.scss';
import React from 'react';
import { goToPage } from '../utils/reducers/pageSlice';

export default function Welcome() {
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.status.logged);
  return (
    <div className='welcome'>
      <h1>Story Clairity</h1>
      <h2>
        An Interactive Story Builder Made by <span>Claire</span>
      </h2>
      <button
        onClick={() => {
          dispatch(goToPage(loggedIn ? 'CHOOSE_GENRE' : 'LOG_IN'));
        }}
      >
        <span>START YOUR ADVENTURE</span>
      </button>
    </div>
  );
}
