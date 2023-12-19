import React from 'react';
import { useSelector } from 'react-redux';
import { genres } from '../utils/genres';
import ReturnHomeButton from './ReturnHomeButton';

export default function Header() {
  const genreKey = useSelector((state) => state.story.genreKey);
  return (
    <div className='header'>
      <h2>
        You are creating a{' '}
        <span className={genreKey}>{genres[genreKey].name}</span> story.
      </h2>
      <ReturnHomeButton />
    </div>
  );
}
