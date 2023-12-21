import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import ReturnHomeButton from '../ReturnHomeButton';
import { chooseStory, goToPage } from '../../utils/reducers/pageSlice';
import { requestToGetUser } from '../../utils/fetchRequests';

export default function UserDetail({ userId }) {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchUser(id) {
      const fetchedUser = await requestToGetUser(userId);
      setUser(fetchedUser);
    }
    fetchUser(userId);
  }, [userId]);

  return (
    user && (
      <div className='userDetailContainer flex-col'>
        <ReturnHomeButton />
        <div className='flex-col'>
          <LabelText label='Username' text={user.username} />
          <LabelText label='Created At' text={user.createdAt} />
          <LabelText label='Last Login' text={user.lastLogIn} />
          <div className='flex-row'>
            <strong>Stories Created: </strong>
            <div className='flex-col'>
              {user.storiesCreated.map((story) => (
                <p
                  key={story._id}
                  className='story'
                  onClick={() => {
                    console.log(story);
                    dispatch(goToPage('STORY_DETAIL'));
                    dispatch(
                      chooseStory({ ...story, username: user.username })
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
