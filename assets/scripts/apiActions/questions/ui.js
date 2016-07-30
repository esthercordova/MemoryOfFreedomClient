'use strict';

const app = require('../../app.js');
const api = require('./api.js');

const showQuestionTemplate = require('../../../templates/showquestion.handlebars');

const success = (data) => {
  if (data) {
    console.log(data);
  } else {
    console.log('Success');
  }
};

const failure = (error) => {
  console.error(error);
};

// const clickthis = function () {
//   $('#question').html(showQuestionTemplate(data));
// };
//  let data = {animal : "fish"};

 const populatingQuestions = function (data) {
   console.log(data);
   $('#question').html(showQuestionTemplate(data));
 };

module.exports = {
  // clickthis,
  success,
  failure,
  populatingQuestions,
};
