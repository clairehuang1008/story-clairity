import React from 'react';
import { useDispatch } from 'react-redux';
import { chooseNewPlot, updateUserPlot } from '../../utils/reducers/storySlice';
import { Palette } from '../../../public/icons';

export default function UserPlot(userPlotProps) {
  const { userInput, setUserInput, userSaved, setUserSaved, chosenOption } =
    userPlotProps;
  const dispatch = useDispatch();
  return (
    <div
      className={`userPlot optionCard${
        chosenOption === 'user' ? ' chosen' : ''
      }`}
      onClick={() => {
        if (!userInput) setUserInput('');
        if (userSaved) dispatch(chooseNewPlot('user'));
      }}
    >
      {userInput === false && (
        <p>
          <Palette />
          Add your creative touch...
        </p>
      )}

      {userInput !== false && (
        <div>
          {userSaved ? (
            <p>{userInput}</p>
          ) : (
            <textarea
              onChange={(e) => setUserInput(e.target.value)}
              placeholder='Add your creative touch...'
              value={userInput}
            ></textarea>
          )}
          <div className='buttons'>
            <button className='edit' onClick={() => setUserSaved(false)}>
              EDIT
            </button>
            <button
              className='save'
              onClick={() => {
                dispatch(updateUserPlot(userInput));
                setUserSaved(true);
              }}
              disabled={userInput.length < 100}
            >
              SAVE
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
