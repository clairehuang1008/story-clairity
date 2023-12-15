import './SavedStoriesContainer.scss';
import SavedStoryCard from './SavedStoryCard';

export default function SavedStoriesContainer({ savedStories }) {
  return (
    <div id='savedStoriesContainer'>
      {savedStories.map((story) => (
        <SavedStoryCard key={story._id} story={story} />
      ))}
    </div>
  );
}
