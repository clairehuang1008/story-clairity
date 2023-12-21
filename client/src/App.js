import './App.scss';
import Welcome from './components/Welcome.jsx';
import GenreCardContainer from './components/GenreCardContainer.jsx';
import { useSelector, useDispatch } from 'react-redux';
import StoryBuilder from './components/StoryBuilder.jsx';
import SavedStoriesContainer from './components/savedStories/SavedStoriesContainer';
import React, { useEffect } from 'react';
import { fetchSavedStories } from './utils/reducers/pageSlice';
import SavedStoryDetail from './components/savedStories/SavedStoryDetail';
import TopBar from './components/TopBar';
import LogInBox from './components/userBox/LogInBox';
import SignUpBox from './components/userBox/SignUpBox';
import UserDetail from './components/userBox/UserDetail';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSavedStories());
  }, [dispatch]);

  const { page, savedStories } = useSelector((state) => state.status);
  console.log('saved stories are', savedStories);

  return (
    <div className='App'>
      {page !== 'LOG_IN' && page !== 'SIGN_UP' && <TopBar />}
      {page === 'HOME' && <Welcome />}
      {page === 'HOME' && <SavedStoriesContainer savedStories={savedStories} />}
      {page === 'CHOOSE_GENRE' && <GenreCardContainer />}
      {page === 'STORY_BUILDER' && <StoryBuilder />}
      {page === 'STORY_DETAIL' && <SavedStoryDetail />}
      {page === 'LOG_IN' && <LogInBox />}
      {page === 'SIGN_UP' && <SignUpBox />}
      {page === 'USER_DETAIL' && <UserDetail />}
    </div>
  );
}

export default App;
