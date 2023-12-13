import { useDispatch, useSelector } from 'react-redux';
import {
  generateAiPlot,
  generateAiImage,
  updateUserPlot,
  chooseNewPlot,
  addPlotCard,
  saveStory,
} from '../utils/reducers/storySlice';
import { useState } from 'react';

export default function PlotCard({ plotCard, index }) {
  const dispatch = useDispatch();
  const aiPlot = plotCard.aiPlot;
  const userPlot = plotCard.userPlot;
  const chosenOption = plotCard.chosen;

  const [userInput, setUserInput] = useState(false);
  const [userSaved, setUserSaved] = useState(false);

  const stage = useSelector((state) => state.story.plotCards).length;
  const aiImageUrl = useSelector((state) => state.story.imageUrl);

  const [buttonValue, setButtonValue] = useState(
    'Generate an AI image for your story.'
  );

  if (index === stage - 1) {
    return (
      <div className='plotCard currentCard'>
        <h3 className={plotCard.type}>{plotCard.type.toUpperCase()}</h3>

        <div
          className={`aiPlot optionCard${
            chosenOption === 'ai' ? ' chosen' : ''
          }`}
          onClick={() => {
            aiPlot === ''
              ? dispatch(generateAiPlot())
              : dispatch(chooseNewPlot('ai'));
          }}
        >
          {aiPlot === '' ? (
            <p className='defaultAiText'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='16'
                height='16'
                fill='currentColor'
                className='bi bi-dice-5'
                viewBox='0 0 16 16'
              >
                <path d='M13 1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2zM3 0a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V3a3 3 0 0 0-3-3z' />
                <path d='M5.5 4a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m8 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m-8 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m4-4a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0' />
              </svg>
              See what AI got...
            </p>
          ) : (
            <p className='aiPlotText'>{aiPlot}</p>
          )}
        </div>

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

        {plotCard.type !== 'ending' && chosenOption !== '' && (
          <div className='next'>
            <p>What's next?</p>
            <div className='nextCardOptions'>
              <button
                className='development'
                onClick={() => dispatch(addPlotCard('development'))}
              >
                Development
              </button>
              <button
                className='twist'
                onClick={() => dispatch(addPlotCard('plot twist'))}
              >
                Plot Twist
              </button>
              <button
                className='ending'
                onClick={() => dispatch(addPlotCard('ending'))}
              >
                Ending
              </button>
            </div>
          </div>
        )}

        {plotCard.type === 'ending' && chosenOption !== '' && (
          <div className='generateImage'>
            {aiImageUrl === '' && (
              <button
                onClick={async () => {
                  dispatch(saveStory());
                  dispatch(generateAiImage());
                  setButtonValue('Generating...');
                }}
              >
                {buttonValue}
              </button>
            )}
            {aiImageUrl !== '' && <img src={aiImageUrl} alt='imageForStory' />}
          </div>
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
