'use strict';

const getFormFields = require('../../../../lib/get-form-fields');

const api  = require('./api');
const ui = require('./ui');
const app = require('../../app');
const questionApi = require('../questions/api');

const onSignUp = function(event){
  event.preventDefault();
  let credentials = getFormFields(event.target);
  new Promise(function(resolve, reject){
    resolve(credentials);
  })
  .then(api.signUp)
  .then((signUpData) => {
    // console.log("inside 1st then signUpData is ", signUpData);
    // console.log("inside 1st then data is ", credentials);
    ui.success(signUpData);
    return credentials;
  })
  .then(api.signIn)
  .then(ui.signInSuccess)
  .then((data) => {
    questionApi.createUserQuestions(data);
  })
  .catch((err) => {
    console.log(err);
  });
};

const onSignIn = function(event){
  event.preventDefault();
  let data = getFormFields(event.target);
  api.signIn(data)
  .done(ui.signInSuccess)
  .fail(ui.failure);
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
  .done(ui.success)
  .fail(ui.failure);
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
