'use strict';

const getFormFields = require('../../../../lib/get-form-fields');
const api = require('./api');
const ui = require('./ui');
const app = require('../../app');

const showChooseWhatToStudyTemplate = require('../../../templates/chooseWhatToStudy.handlebars');

const onPopulatingQuestions = () => {
  $('#startQuestions').hide();
  api.showQuestions()
  .done(ui.populatingQuestions)
  .fail(ui.failure);
};

// const onSaveStatusEasy = (event) => {
//   event.preventDefault();
//   let user_id = app.user.id;
//   let notes = "note";
//   let status = "easy";
//   let dataIdNextQuestion = $(".giveQuestionId").data("id");
//   let question_id = dataIdNextQuestion -1;
//   //console.log( status + " userid " + user_id + "question_id "+ question_id);
//   api.changeQuestionStatus(user_id, question_id, status,  notes)
//   .done(ui.success)
//   .fail(ui.failure);
//   };

  // const onSaveStatusHard = (event) => {
  //   event.preventDefault();
  //   let user_id = app.user.id;
  //   let notes = "note";
  //   let status = "hard";
  //   let dataIdNextQuestion = $(".giveQuestionId").data("id");
  //   let question_id = dataIdNextQuestion -1;
  //   // console.log( status + " userid " + user_id + "question_id "+ question_id);
  //   api.changeQuestionStatus(user_id, question_id, status,  notes)
  //   .done(ui.success)
  //   .fail(ui.failure);
  //   };

const onShowStatictics = (event) => {
  event.preventDefault();
  api.getStatusStatistics()
  .done(ui.gettingStatistics)
  .fail(ui.failure);
};

const onChooseWhatToStudy = () => {
  $(".start").html(showChooseWhatToStudyTemplate());
};

const onShowJointTableId = (event) => {

  return new Promise(function(resolve,reject) {
  event.preventDefault();
  let user_id = app.user.id;
  let question_id = 1;
  let status = "testa";
  let notes = "please work";

  api.getJointTableId(question_id, user_id)

  .done(function(data){
    let user_question_table_id = data.user_questions[0].id;
    console.log(data);
    console.log("user_question ID " + data.user_questions[0].id);
    console.log("question_id " + question_id + "user_id " + user_id);
    console.log("token" + app.user.token);

    api.changeQuestionStatus( user_id,question_id,status, notes,user_question_table_id)
  })
  .fail(function(data){
    reject(error);
  });
  })
};

const addHandlers = () => {
  $(document).on('click','#start', onShowStatictics);
  // $(document).on('click','#right', onShowStatictics);
  // $(document).on('click','#wrong', onShowStatictics);

  $(document).on( 'click', '#start',onPopulatingQuestions);
  // $(document).on('click', '#right', onSaveStatusEasy);
  // $(document).on('click', '#wrong', onSaveStatusHard);
  $(document).on('click', '#stop', onChooseWhatToStudy);

  //test get the joint id
  $(document).on('click', '#right', onShowJointTableId);
  $(document).on('click', '#wrong', onShowJointTableId);
};

module.exports = {
  addHandlers,
  onPopulatingQuestions,
  onShowStatictics,
  // onSaveStatusEasy,
  // onSaveStatusHard,
};
