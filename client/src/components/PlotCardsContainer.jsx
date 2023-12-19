import React from 'react';
import { useSelector } from 'react-redux';
import PlotCard from './PlotCard';

export default function PlotCardsContainer() {
  const plotCards = useSelector((state) => state.story.plotCards);
  return (
    <div className='plotCardsContainer'>
      {plotCards.map((plotCard) => (
        <PlotCard
          key={plotCards.indexOf(plotCard)}
          plotCard={plotCard}
          index={plotCards.indexOf(plotCard)}
        />
      ))}
    </div>
  );
}
