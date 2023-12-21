import React from 'react';
import { useDispatch } from 'react-redux';
import { reset } from '../utils/reducers/storySlice';
import { fetchSavedStories, goToPage } from '../utils/reducers/pageSlice';

export default function ReturnHomeButton() {
  const dispatch = useDispatch();
  return (
    <div
      className='trapdoor'
      onClick={() => {
        dispatch(fetchSavedStories());
        dispatch(reset());
        dispatch(goToPage('HOME'));
      }}
    >
      <div className='top door'></div>
      <div className='bottom door'></div>
      <p className='resetButton'>Back to home page</p>
    </div>
  );
}
