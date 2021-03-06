'use strict';

const getFormFields = require('../../../../lib/get-form-fields');

const api  = require('./api');
const ui = require('./ui');
const questionApi = require('../questions/api');
const questionUi = require('../questions/ui');

const signInSuccessCallback = function(){
      questionUi.countQuestionsOfEachType(true);
};

/*
* Sign up with automatically sign in and then getting and looping through user_questions
*/
const onSignUp = function(event){
  event.preventDefault();
  let credentials = getFormFields(event.target);
  new Promise(function(resolve, reject){
    resolve(credentials);
  })
  .then(api.signUp)
  .then((signUpData) => {
    ui.success(signUpData);
    return credentials;
  })
  .then(api.signIn)
  .then(ui.signInSuccess)
  .then((data) => {
    //change i to number of questions you have plus 1
    for (let i = 1; i < 101; i++) {
      let question_id = i;
      questionApi.createUserQuestions(data, question_id)
      .then(questionUi.createUserQuestionsSuccess);
    }
  }).then(signInSuccessCallback);
};

/*
* Sign in with calling signInSuccess to get numbers for statitic to
* display on ui
*/
const onSignIn = function(event){
  event.preventDefault();
  let data = getFormFields(event.target);
  api.signIn(data)
  .then(ui.signInSuccess)
  .then(signInSuccessCallback)
  .fail(ui.signInFailure);
};

const onSignOut = function(event){
  event.preventDefault();
  api.signOut()
  .done(ui.signOutSuccess)
  .fail(ui.failure);
};

const onChangePassword = function(event){
  event.preventDefault();
  let data = getFormFields(event.target);
  api.changePassword(data)
  .done(ui.changePasswordSuccess)
  .fail(ui.passwordFailure);
};

const addHandlers = () => {
  $('#sign-up').on('submit', onSignUp);
  $('#sign-in').on('submit', onSignIn);
  $('#sign-out').on('submit', onSignOut);
  $('#change-password').on('submit', onChangePassword);
};

module.exports = {
  addHandlers,
};
