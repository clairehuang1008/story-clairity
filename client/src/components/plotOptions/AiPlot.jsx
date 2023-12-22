import React from 'react';
import { useDispatch } from 'react-redux';
import { generateAiPlot, chooseNewPlot } from '../../utils/reducers/storySlice';
import { Android } from '../../../public/icons';

export default function AiPlot({ aiPlot, chosenOption }) {
  const dispatch = useDispatch();
  return (
    <div className='flex-col width50'>
      <div
        className={`aiPlot optionCard${chosenOption === 'ai' ? ' chosen' : ''}`}
        onClick={() => {
          aiPlot === ''
            ? dispatch(generateAiPlot())
            : dispatch(chooseNewPlot('ai'));
        }}
      >
        {aiPlot === '' ? (
          <p className='defaultAiText'>
            <Android />
            See what AI got...
          </p>
        ) : (
          <p className='aiPlotText'>{aiPlot}</p>
        )}
      </div>
    </div>
  );
}
