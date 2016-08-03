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

const onSaveStatusEasy = (event) => {
  event.preventDefault();
  let user_id = app.user.id;
  let notes = "note";
  let status = "easy";
  let dataIdNextQuestion = $(".giveQuestionId").data("id");
  let question_id = dataIdNextQuestion -1;
  console.log("question_id ", question_id);

  console.log( status + " userid " + user_id + "question_id "+ question_id);
  api.changeQuestionStatus(user_id, question_id, status,  notes)
  .done(ui.success)
  .fail(ui.failure);
  };

  const onSaveStatusHard = (event) => {
    event.preventDefault();
    let user_id = app.user.id;
    let notes = "note";
    let status = "hard";
    let dataIdNextQuestion = $(".giveQuestionId").data("id");
    let question_id = dataIdNextQuestion -1;
    console.log("question_id ", question_id);

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

const onChooseWhatToStudy = () => {
  console.log("button clicked");
  $(".start").html(showChooseWhatToStudyTemplate());
};

const addHandlers = () => {
  $(document).on('click','#start', onShowStatictics);
  $(document).on( 'click', '#start',onPopulatingQuestions);
  $(document).on('click', '#right', onSaveStatusEasy);
  $(document).on('click', '#wrong', onSaveStatusHard);
  $(document).on('click', '#stop', onChooseWhatToStudy);
};

module.exports = {
  addHandlers,
  onPopulatingQuestions,
  onShowStatictics,
  onSaveStatusEasy,
  onSaveStatusHard,
};
