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
import {
  Clock,
  PencilSquare,
  PersonCircle,
  TrashCan,
} from '../../../public/icons';

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
          canEdit={canEdit}
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

function CreatedAt({ time, id, author, authorId, canEdit }) {
  const loggedUser = useSelector((state) => state.status.loggedUser);
  const dispatch = useDispatch();
  return (
    <p className='createdAt'>
      <Clock />
      {time}

      <PersonCircle />
      <button
        className='deleteStory author'
        onClick={() => {
          dispatch(setUserDetailId(authorId));
          dispatch(goToPage('USER_DETAIL'));
        }}
      >
        {author}
      </button>

      <TrashCan />
      <button
        className='deleteStory'
        onClick={async () => {
          if (canEdit) {
            await requestToDeleteStory(id);
            const updatedUser = await requestToGetUser(loggedUser._id);
            dispatch(userLogIn(updatedUser));
            dispatch(fetchSavedStories());
            dispatch(reset());
            dispatch(goToPage('HOME'));
          } else {
            alert("It's not your story. You can't delete it.");
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
    else alert("It's not your story. Your can't edit it.");
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
          <PencilSquare />
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
