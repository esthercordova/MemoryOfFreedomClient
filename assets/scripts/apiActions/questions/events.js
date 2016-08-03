'use strict';

const getFormFields = require('../../../../lib/get-form-fields');
const api = require('./api');
const ui = require('./ui');
const app = require('../../app');

const onPopulatingQuestions = () => {
  $('#startQuestions').hide();
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

// const onCreateStatusForQuestion = (question_id) => {
//   let user_id = app.user.id;
//   let status = "";
//   let notes = "";
//   console.log(status, user_id, question_id, notes);
//   api.createStatusForQuestion(status, user_id, question_id, notes)
//   .done(ui.success)
//   .fail(ui.failure);
// };

// $(document.body).on('click','#showAnswer',function(question){
//   $('#questions').html(showQuestionTemplate(question));
//   console.log('Im in the showTheAnswer');
//   console.log('that is the question', question);
// });

const addHandlers = () => {
  $(document).on('click','#start', onShowStatictics);
  $(document).on( 'click', '#start',onPopulatingQuestions);
};

module.exports = {
  addHandlers,
  onPopulatingQuestions,
  // onPopulatingBuckets,
  // onPopulatingQuestions,
  // onChangeQuestionStatus,
  onShowStatictics,
  // onSaveStatusEasy,
  // onSaveStatusHard,
  // onCreateStatusForQuestion,
  // onShowAndSaveStatus,
  // onCheckIfFirstRound,
};
