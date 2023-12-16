import './SavedStoryDetail.scss';
import ReturnHomeButton from '../ReturnHomeButton';
import { useDispatch } from 'react-redux';
import { reset } from '../../utils/reducers/storySlice';
import { fetchSavedStories, goToPage } from '../../utils/reducers/pageSlice';

export default function SavedStoryDetail({ story }) {
  const { title, genre, plot, imageUrl, createdAt } = story;
  const time = new Date(createdAt).toDateString();
  const dispatch = useDispatch();
  return (
    <div className='storyDetail flex-col'>
      <div className='homeButtonStoryDetail'>
        <ReturnHomeButton />
      </div>
      <div
        className={
          'storyTitle ' + (genre === 'science fiction' ? 'sciFi' : genre)
        }
      >
        <h3>{title}</h3>
      </div>
      <div className='container flex-col'>
        <p className='createdAt'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='19'
            height='19'
            fill='currentColor'
            class='bi bi-clock'
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
            class='bi bi-trash3'
            viewBox='0 0 16 16'
          >
            <path d='M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5' />
          </svg>
          <button
            className='deleteStory'
            onClick={() => {
              fetch(`/stories/${story._id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
              })
                .then((res) => res.json())
                .then(() => {
                  dispatch(fetchSavedStories());
                  dispatch(reset());
                  dispatch(goToPage('HOME'));
                })
                .catch((err) =>
                  console.log('App: delete character: ERROR: ', err)
                );
            }}
          >
            Delete Story
          </button>
        </p>
        <p className='plot'>
          {plot}{' '}
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='20'
            height='20'
            fill='currentColor'
            class='bi bi-vector-pen'
            viewBox='0 0 16 16'
          >
            <path
              fill-rule='evenodd'
              d='M10.646.646a.5.5 0 0 1 .708 0l4 4a.5.5 0 0 1 0 .708l-1.902 1.902-.829 3.313a1.5 1.5 0 0 1-1.024 1.073L1.254 14.746 4.358 4.4A1.5 1.5 0 0 1 5.43 3.377l3.313-.828L10.646.646zm-1.8 2.908-3.173.793a.5.5 0 0 0-.358.342l-2.57 8.565 8.567-2.57a.5.5 0 0 0 .34-.357l.794-3.174-3.6-3.6z'
            />
            <path
              fill-rule='evenodd'
              d='M2.832 13.228 8 9a1 1 0 1 0-1-1l-4.228 5.168-.026.086.086-.026z'
            />
          </svg>
        </p>
        <img src={imageUrl} alt={title} />
      </div>
    </div>
  );
}
