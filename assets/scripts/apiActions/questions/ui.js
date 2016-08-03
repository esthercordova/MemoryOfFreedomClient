'use strict';

const app = require('../../app.js');
const api = require('./api.js');
const questionsEvents = require('./events.js');

const showQuestionTemplate = require('../../../templates/showquestion.handlebars');
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
  $("#statistic").html(showStatisticTemplate(statData));
};

 const populatingQuestions = function (data) {
   let questions = data.questions;
   let i = 0;
   let question = questions[i];

   // hide start page
   $("#question").html(showQuestionTemplate(question));
   $("#answer").hide();

   $(document.body).on('click', '.showAnswerButton', function () {
      $("#answer").show();
      $('.showAnswerButton').hide();
    });
    // start to cycle through the questions
    $(document.body).on('click', '.answerButton', function () {
     let clickedButton = this.id;
     i++;

     $("#question").html(showQuestionTemplate(questions[i]));
     $("#answer").hide();

     if (clickedButton === "right") {

       let status = "easy";
       // because of variable scope has be be required here again
       let questionsEvents = require('./events.js');
       let question_id = questions[i-1].id;
       // questionsEvents.onChangeQuestionStatus(question_id, status);
       } else {
       let status = "hard";
       let questionsEvents = require('./events.js');
       let question_id = questions[i-1].id;
       // questionsEvents.onChangeQuestionStatus(question_id, status);
     }
    });
  };

module.exports = {
  success,
  failure,
  gettingStatistics,
  populatingQuestions,
  changeQuestionStatusSuccess,
};
