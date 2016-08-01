'use strict';

const app = require('../../app.js');
const api = require('./api.js');
let questionsEvents = require('./events.js');

const showQuestionTemplate = require('../../../templates/showquestion.handlebars');
const showBucketsTemplate = require('../../../templates/showbuckets.handlebars');
const showStatisticTemplate = require('../../../templates/statistic.handlebars');

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

const gettingStatistics = function (data) {
  let user_questions = data.user_questions;
  // console.log("user questions is this : ", user_questions);

  console.log("data in gettingStatistics ", data);
  // console.log("this is status from first question", user_questions[0].status);
  // console.log("this is user id from question 4 " + user_questions[4]["user"].id);
  let easyCount = 0 ;
  let hardCount = 0 ;
  $.each(user_questions, function(key, value) {
    if(value.status === "easy") {
      return easyCount += 1;
    } else if (value.status === "hard"){
      return hardCount += 1;
    }

    // console.log("current user id " , app.user.id);
    // console.log("status is ", value.status);
  });

  let statData = {
    easy: easyCount,
    hard: hardCount,
  };

  console.log("easy count: " + easyCount + " hard count " + hardCount);
  $("#statistic").html(showStatisticTemplate(statData));
};
 const populatingQuestions = function (data) {
  let questions = data.questions;
  let i = 0;
  let question = questions[i];
  $("#question").html(showQuestionTemplate(question));
  //when button clicked than show next question
  $(document.body).on('click', '.answerButton', function () {
    let clickedButton = this.id;
    i++;
    $("#question").html(showQuestionTemplate(questions[i]));

    if (clickedButton === "right") {
      let status = "easy";
      // because of variable scope has be be required here again
      let questionsEvents = require('./events.js');
      let question_id = questions[i-1].id;
      // console.log("this is the questions id ", question_id);
      // questionsEvents.onChangeQuestionStatus(question_id, status);

      } else {
      let status = "hard";
      let questionsEvents = require('./events.js');
      let question_id = questions[i-1].id;
      // questionsEvents.onChangeQuestionStatus(question_id, status);
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
  gettingStatistics,
  populatingQuestions,
  changeQuestionStatusSuccess,
};
