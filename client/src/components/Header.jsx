import { useSelector } from 'react-redux';
import { genres } from '../utils/genres';

export default function Header({ restart }) {
  const genreKey = useSelector((state) => state.story.genreKey);
  return (
    <div className='header'>
      <h2>
        You are creating a{' '}
        <span className={genreKey}>{genres[genreKey].name}</span> story.
      </h2>
      <div className='trapdoor' onClick={restart}>
        <div className='top door'></div>
        <div className='bottom door'></div>
        <p className='resetButton'>Back to home page</p>
      </div>
    </div>
  );
}
