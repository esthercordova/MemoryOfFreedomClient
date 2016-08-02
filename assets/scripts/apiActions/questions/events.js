'use strict';

const getFormFields = require('../../../../lib/get-form-fields');
const api = require('./api');
const ui = require('./ui');
const app = require('../../app');

const onPopulatingQuestions = () => {
  api.showQuestions()
  .done(ui.populatingQuestions)
  .fail(ui.failure);
};

// const onShowAndSaveStatus = (events) => {
//   event.preventDefault();
//   let user_id = app.user.id;
//   let notes = "";
//   let question_id = 1;
//   console.log("hura");
//   console.log("hurasss" + data);
//   api.showQuestions()
//   .done(ui.success)
//   .then(() => {
//     api.createQuestionInJointTable(status, user_id, question_id, notes)
//     .done(ui.success)
//     .fail(ui.failure);
//     })
//   .fail(ui.failure);
//   };



  // api.changeQuestionStatus(status, user_id, question_id, notes)
  // .done(ui.success)
  // .fail(ui.failure);


const onShowStatictics = (event) => {
  event.preventDefault();
  api.getStatusStatistics()
  .done(ui.gettingStatistics)
  .fail(ui.failure);
};

const onSaveStatusEasy = () => {
  let user_id = app.user.id;
  let status = "easy";
  console.log("here");
  console.log("status"+ status);
  api.saveStatus(status, user_id)
  .done(ui.success)
  .fail(ui.failure);
};

const onSaveStatusHard = () => {
  let user_id = app.user.id;
  let status = "hard";
  console.log("here");
  console.log("status"+ status);
  api.saveStatus(status, user_id)
  .done(ui.success)
  .fail(ui.failure);
};
const addHandlers = () => {
  $(document).on('click','#start', onShowStatictics);
  $(document).on( 'click', '#start',onPopulatingQuestions);
  $(document).on( 'click', '#right',onSaveStatusEasy);
  $(document).on( 'click', '#wrong',onSaveStatusHard);
};

module.exports = {
  addHandlers,
  // onPopulatingBuckets,
  onPopulatingQuestions,
  // onChangeQuestionStatus,
  onShowStatictics,
  onSaveStatusEasy,
  onSaveStatusHard,
  // onShowAndSaveStatus,
  // onCheckIfFirstRound,
  // onChangeQuestionStatusToEasy,
  // onChangeQuestionStatusToMedium,
  // onChangeQuestionStatusToHard,
};
