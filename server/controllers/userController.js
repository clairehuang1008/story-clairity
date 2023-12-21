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

userController.pushStoriesCreated = (req, res, next) => {
  const userId = res.locals.newStory.userId;
  const storyId = res.locals.newStory._id;
  User.findByIdAndUpdate(
    userId,
    {
      $push: { storiesCreated: storyId },
    },
    { new: true }
  )
    .then(() => next())
    .catch((err) =>
      next({
        log: 'Express error handler caught userController.pushStoriesCreated middleware error',
        message: {
          err: 'An error occurred when populating storiesCreated array for user',
        },
      })
    );
};

userController.pullStoriesCreated = (req, res, next) => {
  const userId = res.locals.deleted.userId;
  const storyId = res.locals.deleted._id;
  User.findByIdAndUpdate(
    userId,
    {
      $pull: { storiesCreated: storyId },
    },
    { new: true }
  )
    .then(() => next())
    .catch((err) =>
      next({
        log: 'Express error handler caught userController.pullStoriesCreated middleware error',
        message: {
          err: 'An error occurred when removing storyId in the storiesCreated array for user',
        },
      })
    );
};

userController.getUsernameForStory = (req, res, next) => {
  const id = res.locals.story.userId;
  User.findById(id)
    .then((user) => (res.locals.username = user.username))
    .then(() => next())
    .catch((err) =>
      next({
        log: 'Express error handler caught userController.getUsernameForStory middleware error',
        message: {
          err: 'An error occurred when getting user information for a story',
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
      res.locals.user = await User.findOneAndUpdate(
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
