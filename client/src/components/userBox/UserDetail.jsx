import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReturnHomeButton from '../ReturnHomeButton';
import { chooseStory, goToPage } from '../../utils/reducers/pageSlice';

export default function UserDetail() {
  const { user, storiesCreated } = useSelector((state) => state.status.logged);
  const dispatch = useDispatch();
  console.log(user, storiesCreated);

  return (
    user &&
    storiesCreated && (
      <div className='userDetailContainer flex-col'>
        <ReturnHomeButton />
        <div className='flex-col'>
          <LabelText label='Username' text={user.username} />
          <LabelText label='Created At' text={user.createdAt} />
          <LabelText label='Last Login' text={user.lastLogIn} />
          <div className='flex-row'>
            <strong>Stories Created: </strong>
            <div className='flex-col'>
              {storiesCreated.map((story) => (
                <p
                  key={story._id}
                  className='story'
                  onClick={() => {
                    console.log(story);
                    dispatch(goToPage('STORY_DETAIL'));
                    dispatch(
                      chooseStory({ story: story, username: user.username })
                    );
                  }}
                >
                  {story.title}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  );
}

function LabelText({ label, text }) {
  return (
    <div className='flex-row'>
      <strong>{label + ': '}</strong>
      <p>{text}</p>
    </div>
  );
}
