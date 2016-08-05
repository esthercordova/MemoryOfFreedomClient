'use strict';

const app = require('../../app.js');
const api = require('./api.js');
const questionsEvents = require('./events.js');

const showQuestionTemplate = require('../../../templates/showquestion.handlebars');
const showStatisticTemplate = require('../../../templates/statistic.handlebars');
const chooseWhatToStudyTemplate = require('../../../templates/chooseWhatToStudy.handlebars');


const showButtons = (countObject) => {
  $('.start').html(chooseWhatToStudyTemplate(countObject));
}

const showCount = (countObject) => {
  $("#statistic").html(showStatisticTemplate(countObject));
}

const loopThroughQuestions = (questions) => {
  let i = 0;
  let question = questions[i];
  console.log(question);
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


const addNicknameSuccess = () => {
  $('#nickname').val(' ');
  api.getProfileId()
  .then((res) => {
    app.user.profile = res.user.profile;
    $('#nicknameDelete').removeClass('hide');
    $('#nicknameSubmit').addClass('hide');
    $('#nickname').addClass('borderless');
    $('#nickname').val(app.user.profile.nickname);
  });
  // .then((res) => {
  //   app.user.profile = res.user.profile;
  // });
  // console.log(data.user.);
  console.log("app in add Nickname Success ", app);
};

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


const gettingStatistics = function (user_questions) {
  console.log("in getShow statistic");
  let easyCount = 0 ;
  let hardCount = 0 ;
  let totalCount = 0;
  $.each(user_questions, function(key, value) {
    if(value.status === "easy") {
      totalCount+=1;
      return easyCount += 1;
    } else if (value.status === "hard"){
      totalCount+=1;
      return hardCount += 1;
    }
  });
  console.log("total count " + totalCount);
  let statData = {
    easy: easyCount,
    hard: hardCount,
  };
  $("#statistic").html(showStatisticTemplate(statData));

  // if (totalCount>=8) {
  //     $('.start').html(chooseWhatToStudyTemplate());
  // }
};

const populatingEasyQuestions = function (data) {
  let questions = [];
  for (var q in data.questions) {
    if (q.status === "easy") {
      questions.push(question);
    }
  }

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
}

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

const createUserQuestionsSuccess = () => {
};

const deleteNicknameSuccess = () => {
  app.profiles = null;
  $('#nicknameDelete').addClass('hide');
  $('#nicknameSubmit').removeClass('hide');
  $('#nickname').removeClass('borderless');
  $('#nickname').val(' ');
};

const getProfileIdSuccess = (data) => {
  app.profile = data.profile;
  console.log ('app on profile Success ', app);
};

module.exports = {
  success,
  failure,
  gettingStatistics,
  populatingQuestions,
  changeQuestionStatusSuccess,
  createUserQuestionsSuccess,
  addNicknameSuccess,
  deleteNicknameSuccess,
  getProfileIdSuccess,
  showButtons,
  showCount,
  loopThroughQuestions,
};
