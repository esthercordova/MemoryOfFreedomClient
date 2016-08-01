'use strict';

const getFormFields = require('../../../../lib/get-form-fields');
const api = require('./api');
const ui = require('./ui');
const app = require('../../app');

const callClickThis = () => {
  console.log("button clicked");
  ui.clickthis();
};

const onPopulatingQuestions = () => {
  api.showQuestions()
  .done(ui.populatingQuestions)
  .fail(ui.failure);
};

const onChangeQuestionStatus = (question_id) => {
  let status = "easy";
  let user_id = app.user.id;
  let notes = "";
  console.log("here and status is ", status ," and id is ", question_id);
  // api.createQuestionInJointTable();
  api.createQuestionInJointTable(status, user_id, question_id, notes)
  .done(ui.success)
  .fail(ui.failure);
};


const addHandlers = () => {
};

module.exports = {
  addHandlers,
  onPopulatingQuestions,
  onChangeQuestionStatus,
};
