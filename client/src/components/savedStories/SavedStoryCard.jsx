import React from 'react';
import { useDispatch } from 'react-redux';
import { chooseStory, goToPage } from '../../utils/reducers/pageSlice';
import { requestToGetStory } from '../../utils/fetchRequests';

export default function SavedStoryCard({ story }) {
  const { title, genre, createdAt } = story;
  const time = new Date(createdAt).toDateString();
  const dispatch = useDispatch();
  return (
    <div
      className={(genre === 'science fiction' ? 'sciFi' : genre) + ' container'}
      onClick={async () => {
        const chosenStory = await requestToGetStory(story._id);
        dispatch(goToPage('STORY_DETAIL'));
        dispatch(chooseStory(chosenStory));
      }}
    >
      <div className='savedStoryCard flex-col'>
        <p className='title'>{title}</p>
        <p className='createdAt'>{time}</p>
      </div>
    </div>
  );
}
