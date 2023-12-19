import React from 'react';
import { useDispatch } from 'react-redux';
import { chooseNewPlot, updateUserPlot } from '../../utils/reducers/storySlice';

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
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            fill='currentColor'
            className='bi bi-palette-fill'
            viewBox='0 0 16 16'
          >
            <path d='M12.433 10.07C14.133 10.585 16 11.15 16 8a8 8 0 1 0-8 8c1.996 0 1.826-1.504 1.649-3.08-.124-1.101-.252-2.237.351-2.92.465-.527 1.42-.237 2.433.07M8 5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m4.5 3a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3M5 6.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m.5 6.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3' />
          </svg>
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
