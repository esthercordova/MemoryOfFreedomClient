'use strict';

const app = require('../../app.js');
const api = require('./api.js');
let questionsEvents = require('./events.js');

const showQuestionTemplate = require('../../../templates/showquestion.handlebars');

const success = (data) => {
  if (data) {
    console.log(data);
  } else {
    console.log('Success');
  }
};

const changeQuestionStatusSuccess = (data) => {
  if (data) {
    console.log("success, this is the data: " ,data);
  } else {
    console.log('Success, but no data');
  }
};

const failure = (error) => {
  console.error(error);
};

 const populatingQuestions = function (data) {
  let questions = data.questions;
  let i = 0;
  let question = questions[i];
  $("#question").html(showQuestionTemplate(question));

  $(document.body).on('click', '.answerButton', function () {
    let clickedButton = this.id;
    i++;
    $("#question").html(showQuestionTemplate(questions[i]));
    if (clickedButton === "right") {
      console.log("this is the got it button with id: ", clickedButton);
      // make api patch to update status and pass questions[i]
      // because of variable scope has be be required here again
      let questionsEvents = require('./events.js');
      let question_id = questions[i-1].id;
      console.log("this is the questions id ", question_id);
      questionsEvents.onChangeQuestionStatus(question_id);

    } else {
      console.log("this is the next time button with id: ", clickedButton);
    }
   });
 };
  //  let question = questions[0]
  //  console.log("this is the whole question ", questions[0]);
  //  console.log("this is the title ", questions[0].title);
  //  console.log("this is the answers array ", questions[0].answer);

module.exports = {
  success,
  failure,
  populatingQuestions,
  changeQuestionStatusSuccess,
};
