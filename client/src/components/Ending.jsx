import { useDispatch, useSelector } from 'react-redux';
import { saveStory, generateAiImage } from '../utils/reducers/storySlice';
import { Audio } from 'react-loader-spinner';
import SaveStoryButton from './SaveStoryButton';
import { useState } from 'react';
import { generateTitlePrompt } from '../utils/prompts';
import { apiCall } from '../utils/apiCalls';
import { genres } from '../utils/genres';

export default function Ending({ buttonValue, setButtonValue }) {
  const aiImageUrl = useSelector((state) => state.story.imageUrl);
  const pastPlots = useSelector((state) => state.story.pastPlots);
  const [enterTitle, setEnterTitle] = useState(false);
  const [aiTitle, setAiTitle] = useState('');
  const genreKey = useSelector((state) => state.story.genreKey);
  const [userTitle, setUserTitle] = useState('');

  async function handleClickSaveButton() {
    console.log('The entire story is', pastPlots);
    setEnterTitle(true);
    const generatedTitle = await apiCall(
      generateTitlePrompt(pastPlots, genreKey),
      'text'
    );
    setAiTitle(generatedTitle);
  }

  function saveStory(e) {
    e.preventDefault();

    const body = {
      title: userTitle === '' ? aiTitle : userTitle,
      plot: pastPlots,
      genre: genres[genreKey].name,
      onlineImageUrl: aiImageUrl,
    };

    fetch('/save-story', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON',
      },
      body: JSON.stringify(body),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log('saveStory fetch /save-story: ERROR: ', err));
  }

  return (
    <div className='generateImage'>
      {aiImageUrl === '' && (
        <GeneratingImageButton
          buttonValue={buttonValue}
          setButtonValue={setButtonValue}
        />
      )}
      {aiImageUrl !== '' && <SaveStoryButton onClick={handleClickSaveButton} />}
      {enterTitle && (
        <form onSubmit={saveStory} id='saveStoryForm'>
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
      {aiImageUrl !== '' && <img src={aiImageUrl} alt='imageForStory' />}
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
        <div audioContainer>
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
