'use strict';

const getFormFields = require('../../../../lib/get-form-fields');
const api = require('./api');
const ui = require('./ui');
const app = require('../../app');

const callClickThis = () => {
  console.log("button clicked");
  ui.clickthis();
}

const addHandlers = () => {
  $('#dog').on('click', callClickThis);
};

module.exports = {
  addHandlers
};
