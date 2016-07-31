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

const addHandlers = () => {
};

module.exports = {
  addHandlers,
  onPopulatingQuestions,
};
