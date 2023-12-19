import { useSelector } from 'react-redux';
import React, { useState } from 'react';

import Ending from './Ending';
import NextCardOptions from './NextCardOptions';
import AiPlot from './plotOptions/AiPlot';
import UserPlot from './plotOptions/UserPlot';

export default function PlotCard({ plotCard, index }) {
  const aiPlot = plotCard.aiPlot;
  const userPlot = plotCard.userPlot;
  const chosenOption = plotCard.chosen;

  const [userInput, setUserInput] = useState(false);
  const [userSaved, setUserSaved] = useState(false);

  const stage = useSelector((state) => state.story.plotCards).length;

  const [buttonValue, setButtonValue] = useState(
    'Generate an AI image for your story.'
  );

  const userPlotProps = {
    userInput,
    setUserInput,
    userSaved,
    setUserSaved,
    chosenOption,
  };

  if (index === stage - 1) {
    return (
      <div className='plotCard currentCard'>
        <h3 className={plotCard.type}>{plotCard.type.toUpperCase()}</h3>

        <AiPlot aiPlot={aiPlot} chosenOption={chosenOption} />

        <UserPlot {...userPlotProps} />

        {plotCard.type !== 'ending' && chosenOption !== '' && (
          <NextCardOptions />
        )}

        {plotCard.type === 'ending' && chosenOption !== '' && (
          <Ending buttonValue={buttonValue} setButtonValue={setButtonValue} />
        )}
      </div>
    );
  } else {
    const content = chosenOption === 'ai' ? aiPlot : userPlot;
    return (
      <div className='plotCard chosenContent'>
        <h3 className={plotCard.type}>{plotCard.type.toUpperCase()}</h3>
        <p className='chosenContent'>{content}</p>
      </div>
    );
  }
}
