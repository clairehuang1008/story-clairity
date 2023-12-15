import { genres } from '../utils/genres.js';
import { useDispatch } from 'react-redux';
import { setGenre, addPlotCard } from '../utils/reducers/storySlice.js';
import { goToPage } from '../utils/reducers/pageSlice.js';

export default function GenreCard({ genreKey }) {
  const dispatch = useDispatch();
  return (
    <button
      className={`genre-card ${genreKey}`}
      onClick={() => {
        dispatch(setGenre(genreKey));
        dispatch(addPlotCard('beginning'));
        dispatch(goToPage('STORY_BUILDER'));
      }}
    >
      {genres[genreKey].name}
    </button>
  );
}
