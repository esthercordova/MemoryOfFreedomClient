'use strict';

const getFormFields = require('../../../../lib/get-form-fields');

const api  = require('./api');
const ui = require('./ui');
// const app = require('../../app');
const questionApi = require('../questions/api');
const questionUi = require('../questions/ui');

const signInSuccessCallback = function(){
      questionApi.getUserQuestions()
      .then(function (user_questions_object) {
        let user_questions = user_questions_object['user_questions'];

        console.log(user_questions);

        let nEasy = 0;
        let nHard = 0;
        let nNew = 0;

        for (let i in user_questions) {
          console.log(user_questions[i]);
          if (user_questions[i].status === "easy") {
            nEasy+=1;
          }else if (user_questions[i].status === "hard") {
            nHard+=1;
          }
          else if (user_questions[i].status === "") {
            nNew+=1;
          }else{
            console.log("Error: status must be 'easy', 'hard', or ''");
          }
        }
        let countObject = {'nEasy':nEasy, 'nHard':nHard, 'nNew':nNew};
        console.log(countObject);
        questionUi.showButtons(countObject);
        questionUi.showCount(countObject);
      });
};

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
    //change i to number of questions you have plus 1
    for (let i = 1; i < 10; i++) {
      let question_id = i;
      // console.log("data " , data);
      // console.log("user id" + data.user.id);
      questionApi.createUserQuestions(data, question_id)
      .then(questionUi.createUserQuestionsSuccess)
    }
  }).then(signInSuccessCallback);
};

const onSignIn = function(event){
  event.preventDefault();
  let data = getFormFields(event.target);
  api.signIn(data)
  .done(signInSuccessCallback)
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
