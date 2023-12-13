import './App.scss';
import { useState } from 'react';
import Welcome from './components/Welcome.jsx';
import GenreCardContainer from './components/GenreCardContainer.jsx';
import { useSelector, useDispatch } from 'react-redux';
import StoryBuilder from './components/StoryBuilder.jsx';
import { reset } from './utils/reducers/storySlice';

function App() {
  const [start, setStart] = useState(false);
  const genreKey = useSelector((state) => state.story.genreKey);
  const dispatch = useDispatch();

  function restart() {
    setStart(false);
    dispatch(reset());
  }

  return (
    <div className='App'>
      {!start && <Welcome onClick={() => setStart(true)} />}
      {start && genreKey === '' && <GenreCardContainer restart={restart} />}
      {genreKey !== '' && <StoryBuilder restart={restart} />}
    </div>
  );
}

export default App;
