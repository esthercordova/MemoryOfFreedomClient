'use strict';

const getFormFields = require('../../../../lib/get-form-fields');
const api = require('./api');
const ui = require('./ui');
const app = require('../../app');

const onPopulatingBuckets = () => {
  api.showBuckets()
  .done(ui.populatingBuckets)
  .fail(ui.failure);
};

const onPopulatingQuestions = () => {
  api.showQuestions()
  .done(ui.populatingQuestions)
  .fail(ui.failure);
};

const onChangeQuestionStatus = (question_id, status) => {
  let user_id = app.user.id;
  let notes = "";
  console.log("here and status is ", status ," and id is ", question_id);
  api.createQuestionInJointTable(status, user_id, question_id, notes)
  .done(ui.success)
  .fail(ui.failure);
};


// const onChangeQuestionStatusToEasy = (question_id) => {
//   let status = "easy";
//   let user_id = app.user.id;
//   let notes = "";
//   console.log("here and status is ", status ," and id is ", question_id);
//   api.createQuestionInJointTable(status, user_id, question_id, notes)
//   .done(ui.success)
//   .fail(ui.failure);
// };
//
// const onChangeQuestionStatusToMedium = (question_id) => {
//   let status = "medium";
//   let user_id = app.user.id;
//   let notes = "";
//   console.log("here and status is ", status ," and id is ", question_id);
//   api.createQuestionInJointTable(status, user_id, question_id, notes)
//   .done(ui.success)
//   .fail(ui.failure);
// };
//
// const onChangeQuestionStatusToHard = (question_id) => {
//   let status = "hard";
//   let user_id = app.user.id;
//   let notes = "";
//   console.log("here and status is ", status ," and id is ", question_id);
//   api.createQuestionInJointTable(status, user_id, question_id, notes)
//   .done(ui.success)
//   .fail(ui.failure);
// };


const addHandlers = () => {
};

module.exports = {
  addHandlers,
  onPopulatingBuckets,
  onPopulatingQuestions,
  onChangeQuestionStatus,
  // onChangeQuestionStatusToEasy,
  // onChangeQuestionStatusToMedium,
  // onChangeQuestionStatusToHard,
};
