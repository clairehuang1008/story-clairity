import './App.scss';
import { useState } from 'react';
import Welcome from './components/Welcome.jsx';
import GenreCardContainer from './components/GenreCardContainer.jsx';
import { useSelector } from 'react-redux';
import StoryBuilder from './components/StoryBuilder.jsx';

function App() {
  const [start, setStart] = useState(false);
  const genreKey = useSelector((state) => state.story.genreKey);

  return (
    <div className='App'>
      {!start && <Welcome onClick={() => setStart(true)} />}
      {start && genreKey === '' && <GenreCardContainer />}
      {genreKey !== '' && <StoryBuilder />}
    </div>
  );
}

export default App;
