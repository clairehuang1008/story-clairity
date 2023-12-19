import React from 'react';
import { genres } from '../utils/genres.js';
import GenreCard from './GenreCard.jsx';
import './GenreCardContainer.scss';
import ReturnHomeButton from './ReturnHomeButton.jsx';

export default function GenreCardContainer() {
  const genreKeys = Object.keys(genres);
  return (
    <div className='topContainerOfGenre'>
      <div className='container'>
        <ReturnHomeButton />
      </div>
      <div className='genreCardContainer'>
        {genreKeys.map((key) => (
          <GenreCard key={key} genreKey={key} />
        ))}
      </div>
    </div>
  );
}
