import { genres } from '../utils/genres.js';
import { useDispatch } from 'react-redux';
import { setGenre, addPlotCard } from '../utils/reducers/storySlice.js';

export default function GenreCard({ genreKey }) {
  const dispatch = useDispatch();
  return (
    <button
      className={`genre-card ${genreKey}`}
      onClick={() => {
        dispatch(setGenre(genreKey));
        dispatch(addPlotCard('beginning'));
      }}
    >
      {genres[genreKey].name}
    </button>
  );
}
