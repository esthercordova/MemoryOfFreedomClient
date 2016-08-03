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

const onSaveStatus = (event) => {
  event.preventDefault();
  // let token = app.user.token;
  let user_id = app.user.id;
  let notes = "note";
  let question_id = 1;
  let status = "easy";
  // :user_id, :question_id, :status, :notes
  console.log( status + " userid " + user_id + "question_id "+ question_id);
  api.changeQuestionStatus(user_id, question_id, status,  notes)
  .done(ui.success)
  .fail(ui.failure);
  };

const onShowStatictics = (event) => {
  event.preventDefault();
  api.getStatusStatistics()
  .done(ui.gettingStatistics)
  .fail(ui.failure);
};

const addHandlers = () => {
  $(document).on('click','#start', onShowStatictics);
  $(document).on( 'click', '#start',onPopulatingQuestions);
  $(document).on('click', '#right', onSaveStatus);
};

module.exports = {
  addHandlers,
  onPopulatingQuestions,
  onShowStatictics,
  onSaveStatus,

};
