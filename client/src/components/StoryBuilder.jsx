import Header from './Header.jsx';
import './StoryBuilder.scss';
import PlotCardsContainer from './PlotCardsContainer.jsx';

export default function StoryBuilder({ restart }) {
  return (
    <div className='storyBuilder'>
      <Header restart={restart} />
      <PlotCardsContainer />
    </div>
  );
}
