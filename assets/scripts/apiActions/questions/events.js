'use strict';

const api = require('./api');
const ui = require('./ui');
const app = require('../../app');

/*
* After stop button is clicked calles countQuestionsOfEachType function,
* which keeps track of the question statistics and displays buttons to chooseWhatToStudy
* what the user wants to study
*/
const onChooseWhatToStudy = () => {
  ui.countQuestionsOfEachType(true);
};

/*
* Starts to display questions in the new bucket and pushes each questions
* based on user input into easy or hard bucket
*
* Only difference between onClickEasyBucketButton, onClickHardBucketButton,
* onClickNewBucketButtonis the harcoded status variable - refactoring would be good!
*/
const onClickNewBucketButton = (event) => {
  event.preventDefault();
  // get all of the new user_questions
  api.getUserQuestions()
  .then(function (user_questions_object) {
    let user_questions = user_questions_object['user_questions'];
    let questionsArray = [];
    for (let i in user_questions) {
      if (user_questions[i].status === "") {
        questionsArray.push(user_questions[i]);
      }
    }
    ui.loopThroughQuestions(questionsArray);
  });
};

/*
* Same as onClickNewBucketButton but takes care of button/status "easy"
*/
const onClickEasyBucketButton = (event) => {
  event.preventDefault();
  // get all of the new user_questions
  api.getUserQuestions()
  .then(function (user_questions_object) {
    let user_questions = user_questions_object['user_questions'];
    let questionsArray = [];
    for (let i in user_questions) {
      if (user_questions[i].status === "easy") {
        questionsArray.push(user_questions[i]);
      }
    }
    ui.loopThroughQuestions(questionsArray);
  });
};

/*
* Same as onClickNewBucketButton but takes care of button/status "hard"
*/
const onClickHardBucketButton = (event) => {
  event.preventDefault();
  // get all of the new user_questions
  api.getUserQuestions()
  .then(function (user_questions_object) {
    let user_questions = user_questions_object['user_questions'];
    let questionsArray = [];
    for (let i in user_questions) {
      if (user_questions[i].status === "hard") {
        questionsArray.push(user_questions[i]);
      }
    }
    ui.loopThroughQuestions(questionsArray);
  });
};

/*
* Important for the count of unseen questions
*/
const onChangeQuestionStatus = () => {
};

/*
* Add nickname to database with AJAX call
*/
const onAddNickname = (event) => {
  event.preventDefault();
  let nickname = $('#nickname').val();
  api.addNickname(nickname)
  .done(ui.addNicknameSuccess)
  .fail(ui.failure);
};

/*
* Delete nickname in database with AJAX call
*/
const onDeleteNickname = (event) => {
  event.preventDefault();
  api.deleteNickname()
  .then(ui.deleteNicknameSuccess)
  .catch(error => console.error(error));
};

const addHandlers = () => {
  $(document).on('click', '#stop', onChooseWhatToStudy);
  $(document).on('click','#newBucket', onClickNewBucketButton);
  $(document).on('click','#easyBucket', onClickEasyBucketButton);
  $(document).on('click','#hardBucket', onClickHardBucketButton);
  $(document).on('click','#nicknameSubmit', onAddNickname);
  $(document).on('click','#nicknameDelete', onDeleteNickname);
};

module.exports = {
  addHandlers,
  onAddNickname,
  onDeleteNickname,
};
