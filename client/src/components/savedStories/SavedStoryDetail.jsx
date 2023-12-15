import './SavedStoryDetail.scss';
import ReturnHomeButton from '../ReturnHomeButton';

export default function SavedStoryDetail({ story }) {
  const { title, genre, plot, imageUrl, createdAt } = story;
  const time = new Date(createdAt).toDateString();
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
        </p>
        <p className='plot'>
          {plot}{' '}
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='20'
            height='20'
            fill='currentColor'
            class='bi bi-hearts'
            viewBox='0 0 16 16'
          >
            <path
              fill-rule='evenodd'
              d='M4.931.481c1.627-1.671 5.692 1.254 0 5.015-5.692-3.76-1.626-6.686 0-5.015Zm6.84 1.794c1.084-1.114 3.795.836 0 3.343-3.795-2.507-1.084-4.457 0-3.343ZM7.84 7.642c2.71-2.786 9.486 2.09 0 8.358-9.487-6.268-2.71-11.144 0-8.358Z'
            />
          </svg>
        </p>
        <img src={imageUrl} alt={title} />
      </div>
    </div>
  );
}
