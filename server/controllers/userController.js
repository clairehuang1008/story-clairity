const User = require('../models/userModel');

const userController = {};

userController.getAllUsers = (req, res, next) => {
  User.find({})
    .then((data) => {
      console.log(data);
      return data;
    })
    .then((users) => (res.locals.users = users))
    .then(() => next())
    .catch((err) => {
      console.log(err);
      next({
        log: 'Express error handler caught userController.getAllUsers middleware error',
        message: {
          err: 'An error occurred when getting all users',
        },
      });
    });
};

userController.incrementStoryCount = (req, res, next) => {
  const id = res.locals.newStory.userId;
  User.findByIdAndUpdate(id, { $inc: { storyCreated: 1 } }, { new: true })
    .then(() => next())
    .catch((err) =>
      next({
        log: 'Express error handler caught userController.incrementStoryCount middleware error',
        message: {
          err: 'An error occurred when updating user created stories count',
        },
      })
    );
};

userController.getUser = (req, res, next) => {
  const id = req.params.id;
  User.findById(id)
    .then((data) => (res.locals.user = data))
    .then(() => next())
    .catch((err) =>
      next({
        log: 'Express error handler caught userController.getUser middleware error',
        message: { err: 'An error occurred when getting user information' },
      })
    );
};

userController.signUpNewUser = async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  console.log(req.body);
  try {
    if (user) {
      res.locals.signUpErr = 'Username already in use.';
    } else {
      res.locals.newUser = await User.create({ username, password });
    }
    return next();
  } catch (error) {
    return next({
      log: 'Express error handler caught userController.signUpNewUser middleware error',
      message: { err: 'An error occurred when signing up' },
    });
  }
};

userController.logIn = async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  try {
    if (!user) {
      res.locals.logInErr = 'Username not found.';
    } else if (user.password !== password) {
      res.locals.logInErr = 'Password incorrect.';
    } else {
      res.locals.loggedUser = await User.findOneAndUpdate(
        { _id: user._id },
        { lastLogIn: Date.now() },
        { new: false }
      );
    }
    return next();
  } catch (error) {
    return next({
      log: 'Express error handler caught userController.logIn middleware error',
      message: { err: 'Unknown error occurred when logging in' },
    });
  }
};

module.exports = userController;
