import React from 'react';
import { useDispatch } from 'react-redux';
import { chooseStory, goToPage } from '../../utils/reducers/pageSlice';

export default function SavedStoryCard({ story }) {
  const { title, genre, createdAt } = story;
  const time = new Date(createdAt).toDateString();
  const dispatch = useDispatch();
  return (
    <div
      className={(genre === 'science fiction' ? 'sciFi' : genre) + ' container'}
      onClick={() => {
        fetch(`/get-story/${story._id}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        })
          .then((res) => res.json())
          .then((data) => {
            dispatch(goToPage('STORY_DETAIL'));
            dispatch(chooseStory(story));
          })
          .catch((err) => console.log('App: getting story: ERROR: ', err));
      }}
    >
      <div className='savedStoryCard flex-col'>
        <p className='title'>{title}</p>
        <p className='createdAt'>{time}</p>
      </div>
    </div>
  );
}
