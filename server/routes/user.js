const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const storyController = require('../controllers/storyController');

router.get('/all', userController.getAllUsers, (req, res) => {
  console.log('GET /user/all route hit');
  res.status(200).json(res.locals.users);
});

router.post('/signup', userController.signUpNewUser, (req, res) => {
  console.log('POST /user/signup route hit');
  const response = res.locals.signUpErr
    ? { err: res.locals.signUpErr }
    : res.locals.user;
  res.status(200).json(response);
});

router.post(
  '/login',
  userController.logIn,
  storyController.getStoriesForUser,
  (req, res) => {
    console.log('POST /user/login route hit');
    console.log(res.locals.logInErr);
    if (res.locals.user) {
      const user = { ...res.locals.user._doc };
      user.storiesCreated = res.locals.storiesCreated;
    }
    const response = res.locals.logInErr ? { err: res.locals.logInErr } : user;
    res.status(200).json(response);
  }
);

router.get(
  '/:id',
  userController.getUser,
  storyController.getStoriesForUser,
  (req, res) => {
    console.log('GET /user/:id route hit');
    const user = { ...res.locals.user._doc };
    user.storiesCreated = res.locals.storiesCreated;
    res.status(200).json(user);
  }
);

module.exports = router;
