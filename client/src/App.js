import './App.scss';
import Welcome from './components/Welcome.jsx';
import GenreCardContainer from './components/GenreCardContainer.jsx';
import { useSelector, useDispatch } from 'react-redux';
import StoryBuilder from './components/StoryBuilder.jsx';
import SavedStoriesContainer from './components/savedStories/SavedStoriesContainer';
import React, { useEffect } from 'react';
import { fetchSavedStories, goToPage } from './utils/reducers/pageSlice';
import SavedStoryDetail from './components/savedStories/SavedStoryDetail';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSavedStories());
  }, [dispatch]);

  const { page, savedStories } = useSelector((state) => state.status);
  console.log('saved stories are', savedStories);

  return (
    <div className='App'>
      {page === 'HOME' && (
        <Welcome onClick={() => dispatch(goToPage('CHOOSE_GENRE'))} />
      )}
      {page === 'HOME' && <SavedStoriesContainer savedStories={savedStories} />}
      {page === 'CHOOSE_GENRE' && <GenreCardContainer />}
      {page === 'STORY_BUILDER' && <StoryBuilder />}
      {page === 'STORY_DETAIL' && <SavedStoryDetail />}
    </div>
  );
}

export default App;
