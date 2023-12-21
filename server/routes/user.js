const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.get('/all', userController.getAllUsers, (req, res) => {
  console.log('GET /user/all route hit');
  res.status(200).json(res.locals.users);
});

router.post('/signup', userController.signUpNewUser, (req, res) => {
  console.log('POST /user/signup route hit');
  const response = res.locals.signUpErr
    ? { err: res.locals.signUpErr }
    : res.locals.newUser;
  res.status(200).json(response);
});

router.post('/login', userController.logIn, (req, res) => {
  console.log('POST /user/login route hit');
  const response = res.locals.logInErr
    ? { err: res.locals.logInErr }
    : res.locals.loggedUser;
  res.status(200).json(response);
});

router.get('/:id', userController.getUser, (req, res) => {
  console.log('GET /user/:id route hit');
  res.status(200).json(res.locals.user);
});

module.exports = router;
