import React from 'react';
import Header from './Header.jsx';
import './StoryBuilder.scss';
import PlotCardsContainer from './PlotCardsContainer.jsx';

export default function StoryBuilder() {
  return (
    <div className='storyBuilder'>
      <Header />
      <PlotCardsContainer />
    </div>
  );
}
