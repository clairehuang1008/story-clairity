import { genres } from '../utils/genres.js';
import GenreCard from './GenreCard.jsx';
import './GenreCardContainer.scss';

export default function GenreCardContainer({ restart }) {
  const genreKeys = Object.keys(genres);
  return (
    <div className='topContainerOfGenre'>
      <div className='container'>
        <div className='trapdoor' onClick={restart}>
          <div className='top door'></div>
          <div className='bottom door'></div>
          <p className='resetButton'>Back to home page</p>
        </div>
      </div>
      <div className='genreCardContainer'>
        {genreKeys.map((key) => (
          <GenreCard key={key} genreKey={key} />
        ))}
      </div>
    </div>
  );
}
