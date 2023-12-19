import React from 'react';
import { useDispatch } from 'react-redux';
import { addPlotCard } from '../utils/reducers/storySlice';

export default function NextCardOptions() {
  const dispatch = useDispatch();
  const cardOptions = ['development', 'twist', 'ending'];
  return (
    <div className='next'>
      <p>What's next?</p>
      <div className='nextCardOptions'>
        {cardOptions.map((option) => (
          <button
            key={option}
            className={option}
            onClick={() =>
              dispatch(addPlotCard(option === 'twist' ? 'plot twist' : option))
            }
          >
            {(option === 'twist' ? 'plot twist' : option).toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
}
