import React from 'react';
import { genres } from '../utils/genres.js';
import { useDispatch, useSelector } from 'react-redux';
import { setGenre, addPlotCard } from '../utils/reducers/storySlice.js';
import { goToPage } from '../utils/reducers/pageSlice.js';

export default function GenreCard({ genreKey }) {
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.status.logged);
  return (
    <button
      className={`genre-card ${genreKey}`}
      onClick={() => {
        dispatch(setGenre(genreKey));
        dispatch(addPlotCard('beginning'));
        dispatch(goToPage(loggedIn ? 'STORY_BUILDER' : 'LOG_IN'));
      }}
    >
      {genres[genreKey].name}
    </button>
  );
}
