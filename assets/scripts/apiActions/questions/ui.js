'use strict';

const app = require('../../app.js');
const api = require('./api.js');

const showQuestionTemplate = require('../../../templates/showquestion.handlebars');

const clickthis = function () {
  $('#question').html(showQuestionTemplate(data));
};
 let data = {animal : "fish"};

module.exports = {
  clickthis,
};
