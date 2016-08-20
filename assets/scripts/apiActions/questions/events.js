'use strict';

const api = require('./api');
const ui = require('./ui');
const app = require('../../app');

// const showChooseWhatToStudyTemplate = require('../../../templates/chooseWhatToStudy.handlebars');

const onChooseWhatToStudy = () => {
  ui.countQuestionsOfEachType(true);
};

//first get joint table id then PATCH
//Only difference between onChangeStatusEasy and onChangeStatusHard is the
//harcoded status variable - when time refactor

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

const onChangeQuestionStatus = () => {

};

// need to add in the end ui.gettingStatistics to update statistics on front end
const onChangeStatusEasy = (event) => {
  return new Promise(function(resolve,reject) {
  event.preventDefault();
  let user_id = app.user.id;
  let question_id = $('.giveQuestionId').attr('data-id') - 1;
  let status = "easy";
  let notes = "";
  api.getJointTableId(question_id, user_id)
  .then(function(data){
    let user_question_table_id = data.user_questions[0].id;
    // console.log(data);
    // console.log("user_question ID " + data.user_questions[0].id);
    // console.log("question_id " + question_id + "user_id " + user_id);
    console.log("token" + app.user.token).then(function() {
      api.changeQuestionStatus( user_id,question_id,status,
        notes,user_question_table_id);
    });
  })
  .then(function(event){
    api.getStatusStatistics()
    .done(ui.gettingStatistics)
    .fail(ui.failure);
  })
  .fail(function(error){
    reject(error);
  });
});
};

const onChangeStatusHard = (event) => {
  return new Promise(function(resolve,reject) {
  event.preventDefault();
  let user_id = app.user.id;
  let question_id = $('.giveQuestionId').attr('data-id') - 1;
  let status = "hard";
  let notes = "";
  api.getJointTableId(question_id, user_id)
  .done(function(data){
    let user_question_table_id = data.user_questions[0].id;
    // console.log(data);
    // console.log("user_question ID " + data.user_questions[0].id);
    // console.log("question_id " + question_id + "user_id " + user_id);
    // console.log("token" + app.user.token);
    api.changeQuestionStatus( user_id,question_id,status, notes,user_question_table_id)
  })
  .fail(function(data){
    reject(error);
  });
});
};

const onAddNickname = (event) => {
  event.preventDefault();
  let nickname = $('#nickname').val();
  api.addNickname(nickname)
  .done(ui.addNicknameSuccess)
  .fail(ui.failure);
};

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
