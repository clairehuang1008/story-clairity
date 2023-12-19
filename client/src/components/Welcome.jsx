// import logo from '../assets/logos/logo.png';
import './Welcome.scss';
import React from 'react';

export default function Welcome({ onClick }) {
  return (
    <div className='welcome'>
      <h1>Story Clairity</h1>
      <h2>
        An Interactive Story Builder Made by <span>Claire</span>
      </h2>
      <button onClick={onClick}>
        <span>START YOUR ADVANTURE</span>
      </button>
    </div>
  );
}
