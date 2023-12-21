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
    : { user: res.locals.newUser, storiesCreated: [] };
  res.status(200).json(response);
});

router.post(
  '/login',
  userController.logIn,
  storyController.getStoriesForUser,
  (req, res) => {
    console.log('POST /user/login route hit');
    const response = res.locals.logInErr
      ? { err: res.locals.logInErr }
      : res.locals;
    res.status(200).json(response);
  }
);

router.get(
  '/:id',
  userController.getUser,
  storyController.getStoriesForUser,
  (req, res) => {
    console.log('GET /user/:id route hit');
    res.status(200).json(res.locals);
  }
);

module.exports = router;
