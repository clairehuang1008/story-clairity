import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ReturnHomeButton from '../ReturnHomeButton';
import { requestToGetUser } from '../../utils/fetchRequests';

export default function UserDetail() {
  const userId = useSelector((state) => state.status.userId);
  const page = useSelector((state) => state.status.page);
  console.log(userId);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await requestToGetUser(userId);
        setUser(response);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    }
    fetchUser();
  }, [page, userId]);

  return (
    user && (
      <div className='userDetailContainer flex-col'>
        <ReturnHomeButton />
        <div className='flex-col'>
          <LabelText label='Username' text={user.username} />
          <LabelText label='Created At' text={user.createdAt} />
          <LabelText label='Last Login' text={user.lastLogIn} />
          <LabelText label='Stories Created' text={user.storyCreated} />
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
