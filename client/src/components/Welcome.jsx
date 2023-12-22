// import logo from '../assets/logos/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import './Welcome.scss';
import React, { useState } from 'react';
import { goToPage } from '../utils/reducers/pageSlice';
import { GithubLogo, InstagramLogo, LinkedInLogo } from '../../public/icons';

export default function Welcome() {
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.status.loggedUser);
  const [socialsVisible, setSocialsVisible] = useState(false);
  return (
    <div className='welcome'>
      <h1>Story Clairity</h1>
      <h2>
        An Interactive Story Builder Made by{' '}
        <span onClick={() => setSocialsVisible(!socialsVisible)}>Claire</span>
      </h2>
      {socialsVisible && (
        <div className='socials flex-col'>
          <SocialMedia socialMedia='instagram' username='claiiiirre_hwy' />
          <SocialMedia socialMedia='github' username='clairehuang1008' />
          <SocialMedia
            socialMedia='linkedin'
            username='claire-huang-586244205'
          />
        </div>
      )}
      <button
        onClick={() => {
          dispatch(goToPage(loggedIn ? 'CHOOSE_GENRE' : 'LOG_IN'));
        }}
      >
        <span>START YOUR ADVENTURE</span>
      </button>
    </div>
  );
}

function SocialMedia({ socialMedia, username }) {
  return (
    <div className={socialMedia + ' flex-row'}>
      <div className='social-media-logo flex-row'>
        {socialMedia === 'instagram' && <InstagramLogo />}
        {socialMedia === 'github' && <GithubLogo />}
        {socialMedia === 'linkedin' && <LinkedInLogo />}
      </div>
      <p>{username}</p>
    </div>
  );
}
