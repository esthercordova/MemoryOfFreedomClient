'use strict';

// const getFormFields = require('../../../../lib/get-form-fields');
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

const onShowStatictics = (event) => {
  event.preventDefault();
  api.getStatusStatistics()
  .done(ui.gettingStatistics)
  .fail(ui.failure);
};

const onChooseWhatToStudy = () => {
  $(".start").html(showChooseWhatToStudyTemplate());
};

//first get joint table id then PATCH
//Only difference between onChangeStatusEasy and onChangeStatusHard is the
//harcoded status variable - when time refactor

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
    console.log(data);
    console.log("user_question ID " + data.user_questions[0].id);
    console.log("question_id " + question_id + "user_id " + user_id);
    console.log("token" + app.user.token);
    api.changeQuestionStatus( user_id,question_id,status, notes,user_question_table_id)
  })
  // .then(function(data){
  //   ui.gettingStatistics(data)
  // })
  .fail(function(data){
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
    console.log(data);
    console.log("user_question ID " + data.user_questions[0].id);
    console.log("question_id " + question_id + "user_id " + user_id);
    console.log("token" + app.user.token);
    api.changeQuestionStatus( user_id,question_id,status, notes,user_question_table_id)
  })
  .fail(function(data){
    reject(error);
  });
});
};

const onSaveNote = () => {
  console.log("this works");
  let note = $("#note").val();
  console.log(note);
};

const addHandlers = () => {
  $(document).on('click','#start', onShowStatictics);
  $(document).on('click','#right', onShowStatictics);
  $(document).on('click','#wrong', onShowStatictics);

  $(document).on('click', '#start',onPopulatingQuestions);
  $(document).on('click', '#stop', onChooseWhatToStudy);

  $(document).on('click', '#right', onChangeStatusEasy);
  $(document).on('click', '#wrong', onChangeStatusHard);
  $(document).on('click','#saveNote', onSaveNote);
};

module.exports = {
  addHandlers,
  onPopulatingQuestions,
  onShowStatictics,
};
