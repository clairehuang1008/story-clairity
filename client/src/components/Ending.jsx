import { useDispatch, useSelector } from 'react-redux';
import { saveStory, generateAiImage } from '../utils/reducers/storySlice';
import { Audio } from 'react-loader-spinner';
import SaveStoryButton from './SaveStoryButton';
import React, { useState } from 'react';
import { generateTitlePrompt } from '../utils/prompts';
import { genres } from '../utils/genres';
import { reset } from '../utils/reducers/storySlice';
import { fetchSavedStories, goToPage } from '../utils/reducers/pageSlice';
import { requestAiText, requestToSaveStory } from '../utils/fetchRequests';

export default function Ending({ buttonValue, setButtonValue }) {
  const [enterTitle, setEnterTitle] = useState(false);
  const [aiTitle, setAiTitle] = useState('');
  const [userTitle, setUserTitle] = useState('');
  const dispatch = useDispatch();

  const { imageUrl, pastPlots, genreKey, plotCards } = useSelector(
    (state) => state.story
  );
  const userId = useSelector((state) => state.status.loggedUser)._id;
  console.log(userId);

  async function handleClickSaveButton() {
    console.log('The entire story is', pastPlots);
    setEnterTitle(true);
    const generatedTitle = await requestAiText({
      prompt: generateTitlePrompt(pastPlots, genreKey),
    });
    setAiTitle(generatedTitle);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!userId) {
      dispatch(fetchSavedStories());
      dispatch(reset());
      dispatch(goToPage('LOG_IN'));
    }

    const body = {
      title: userTitle === '' ? aiTitle : userTitle,
      plotCards: plotCards.map((card) => {
        const plot = card.chosen === 'ai' ? card.aiPlot : card.userPlot;
        return {
          type: card.type,
          plot: plot,
        };
      }),
      genre: genres[genreKey].name,
      onlineImageUrl: imageUrl,
      userId: userId,
    };
    console.log(body);

    await requestToSaveStory(body);

    dispatch(fetchSavedStories());
    dispatch(reset());
    dispatch(goToPage('HOME'));
  }

  return (
    <div className='generateImage'>
      {imageUrl === '' && (
        <GeneratingImageButton
          buttonValue={buttonValue}
          setButtonValue={setButtonValue}
        />
      )}
      {imageUrl !== '' && <SaveStoryButton onClick={handleClickSaveButton} />}
      {enterTitle && (
        <form onSubmit={handleSubmit} id='saveStoryForm'>
          <label id='titleLabel' for='title'>
            Title:{' '}
          </label>
          <input
            type='text'
            id='title'
            name='title'
            placeholder={aiTitle}
            value={userTitle}
            onChange={(e) => setUserTitle(e.target.value)}
          />
          <input type='submit' className='save' />
        </form>
      )}
      {imageUrl !== '' && <img src={imageUrl} alt='imageForStory' />}
    </div>
  );
}

function GeneratingImageButton({ buttonValue, setButtonValue }) {
  const dispatch = useDispatch();
  return (
    <button
      onClick={async () => {
        dispatch(saveStory());
        dispatch(generateAiImage());
        setButtonValue('Generating...');
      }}
    >
      {buttonValue}
      {buttonValue === 'Generating...' ? (
        <div className='audioContainer'>
          <Audio
            height='80'
            width='100'
            radius='9'
            color='#a4425f'
            ariaLabel='three-dots-loading'
            wrapperStyle
            wrapperClass
          />
        </div>
      ) : (
        ''
      )}
    </button>
  );
}
