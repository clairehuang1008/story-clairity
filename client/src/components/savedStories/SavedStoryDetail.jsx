import './SavedStoryDetail.scss';
import ReturnHomeButton from '../ReturnHomeButton';
import { useDispatch, useSelector } from 'react-redux';
import { reset } from '../../utils/reducers/storySlice';
import {
  chooseStory,
  fetchSavedStories,
  goToPage,
  setUserDetailId,
  userLogIn,
} from '../../utils/reducers/pageSlice';
import {
  requestToDeleteStory,
  requestToGetUser,
  requestToUpdateStory,
} from '../../utils/fetchRequests';
import React, { useState } from 'react';

export default function SavedStoryDetail() {
  const story = useSelector((state) => state.status.chosenStory);
  console.log('story is', story);
  const { title, genre, plotCards, imageUrl, createdAt, username, userId } =
    story;
  const time = new Date(createdAt).toDateString();
  const [edits, setEdits] = useState(Array(plotCards.length).fill(false));
  const loggedUser = useSelector((state) => state.status.loggedUser);
  const canEdit = loggedUser.username === story.username;

  return (
    <div className='storyDetail flex-col'>
      <div className='homeButtonStoryDetail'>
        <ReturnHomeButton />
      </div>

      <Header genre={genre} title={title} />

      <div className='container flex-col'>
        <CreatedAt
          time={time}
          id={story._id}
          author={username}
          authorId={userId}
        />
        <DetailCardsContainer
          plotCards={plotCards}
          edits={edits}
          setEdits={setEdits}
          canEdit={canEdit}
        />
        <img src={imageUrl} alt={title} />
      </div>
    </div>
  );
}

function Header({ genre, title }) {
  return (
    <div
      className={
        'storyTitle ' + (genre === 'science fiction' ? 'sciFi' : genre)
      }
    >
      <h3>{title}</h3>
    </div>
  );
}

function CreatedAt({ time, id, author, authorId }) {
  const loggedUser = useSelector((state) => state.status.logged);
  const dispatch = useDispatch();
  return (
    <p className='createdAt'>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='19'
        height='19'
        fill='currentColor'
        className='bi bi-clock'
        viewBox='0 0 16 16'
      >
        <path d='M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z' />
        <path d='M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0' />
      </svg>
      {time}
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='19'
        height='19'
        fill='currentColor'
        className='bi bi-person-circle'
        viewBox='0 0 16 16'
      >
        <path d='M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0' />
        <path
          fill-rule='evenodd'
          d='M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1'
        />
      </svg>
      <button
        className='deleteStory author'
        onClick={() => {
          dispatch(setUserDetailId(authorId));
          dispatch(goToPage('USER_DETAIL'));
        }}
      >
        {author}
      </button>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='19'
        height='19'
        fill='currentColor'
        className='bi bi-trash3'
        viewBox='0 0 16 16'
      >
        <path d='M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5' />
      </svg>
      <button
        className='deleteStory'
        onClick={async () => {
          if (author === loggedUser.username) {
            await requestToDeleteStory(id);
            const updatedUser = await requestToGetUser(loggedUser._id);
            dispatch(userLogIn(updatedUser));
            dispatch(fetchSavedStories());
            dispatch(reset());
            dispatch(goToPage('HOME'));
          }
        }}
      >
        Delete Story
      </button>
    </p>
  );
}

function DetailCardsContainer({ plotCards, edits, setEdits, canEdit }) {
  function toggleEdit(i) {
    if (canEdit) setEdits(edits.map((el, j) => (j === i ? !el : el)));
  }

  return (
    <div className='plot flex-col plotCardsContainer'>
      {plotCards.map((card, index) =>
        edits[index] ? (
          <PlotCardEditor
            key={index}
            card={card}
            toggleEdit={() => toggleEdit(index)}
          />
        ) : (
          <SavedPlotCard
            key={index}
            card={card}
            toggleEdit={() => toggleEdit(index)}
          />
        )
      )}
    </div>
  );
}

function SavedPlotCard({ card, toggleEdit }) {
  return (
    <div className='plotCard chosenContent'>
      <div className={'flex-row ' + card.type}>
        <h3 className={card.type}>{card.type.toUpperCase()} </h3>
        <div className='flex-row edit' onClick={toggleEdit}>
          {' '}
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='20'
            height='20'
            fill='currentColor'
            class='bi bi-pencil-square'
            viewBox='0 0 16 16'
          >
            <path d='M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z' />
            <path
              fill-rule='evenodd'
              d='M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z'
            />
          </svg>
          <p>edit</p>
        </div>
      </div>
      <p className='chosenContent text'>{card.plot}</p>
    </div>
  );
}

function PlotCardEditor({ card, toggleEdit }) {
  console.log('Editing', card);
  const dispatch = useDispatch();
  const [userInput, setUserInput] = useState('');
  const story = useSelector((state) => state.status.chosenStory);

  async function updatePlotCard() {
    if (userInput !== '') {
      const body = {
        plotCardId: card._id,
        updatedPlot: userInput,
      };
      const updatedStory = await requestToUpdateStory(story._id, body);
      dispatch(goToPage('STORY_DETAIL'));
      dispatch(chooseStory(updatedStory));
    }
  }

  return (
    <div className='update flex-row'>
      <textarea
        placeholder={card.plot}
        onChange={(e) => setUserInput(e.target.value)}
      ></textarea>
      <button
        className='save'
        onClick={() => {
          updatePlotCard();
          toggleEdit();
        }}
      >
        SAVE
      </button>
    </div>
  );
}
