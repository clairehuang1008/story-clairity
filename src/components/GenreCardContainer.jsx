import { genres } from '../utils/genres.js';
import GenreCard from './GenreCard.jsx';
import './GenreCardContainer.scss';

export default function PlotCardContainer() {
  const genreKeys = Object.keys(genres);
  return (
    <div className='genreCardContainer'>
      {genreKeys.map((key) => (
        <GenreCard key={key} genreKey={key} />
      ))}
    </div>
  );
}
