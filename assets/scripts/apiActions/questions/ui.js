'use strict';

const app = require('../../app.js');
const api = require('./api.js');
const questionsEvents = require('./events.js');

const showQuestionTemplate = require('../../../templates/showquestion.handlebars');
const showStatisticTemplate = require('../../../templates/statistic.handlebars');
const chooseWhatToStudyTemplate = require('../../../templates/chooseWhatToStudy.handlebars');

let questionsLength;
let ii;
let clickedButton;
let questions;

const showButtons = (countObject) => {
  console.log('inside fun');
  console.log(countObject);
  $('.start').show();
  $('.start').html(chooseWhatToStudyTemplate(countObject));
}

const showCount = (countObject) => {
  $("#statistic").html(showStatisticTemplate(countObject));
}

const countQuestionsOfEachType = (shouldShowButtons) => {
  api.getUserQuestions()
  .then(function (user_questions_object) {
    let user_questions = user_questions_object['user_questions'];

    let nEasy = 0;
    let nHard = 0;
    let nNew = 0;

    for (let i in user_questions) {

      if (user_questions[i].status === "easy") {
        nEasy+=1;
      }else if (user_questions[i].status === "hard") {
        nHard+=1;
      }
      else if (user_questions[i].status === "") {
        nNew+=1;
      }else{
        console.log("Error: status must be 'easy', 'hard', or ''");
      }
    }
    let countObject = {'nEasy':nEasy, 'nHard':nHard, 'nNew':nNew};
    console.log('inside count questions');
    console.log(countObject);
    showCount(countObject);
    if (shouldShowButtons) {
      showButtons(countObject);
    }
  });
}

const onChangeQuestionStatus = (question, status) => {
  let user_question_id = question.id;
  let question_id = question['question'].id;
  let user_id = app.user.id;
  let notes = "";

    console.log('inside on change');
    console.log(question);
    console.log("user_question ID " + user_question_id);
    console.log("question_id " + question_id + "user_id " + user_id);
    console.log("token" + app.user.token)
      api.changeQuestionStatus( user_id, question_id, status,
        notes,user_question_id)
        .then(function () {
          countQuestionsOfEachType(false);
        }).then(function () {
          if (ii >= questionsLength) {
            console.log('length too much');
            countQuestionsOfEachType(true);
          }
  })
  .fail(function(error){
    reject(error);
  });
}

const loopThroughQuestions = (questionsNew, start) => {
  questions = questionsNew;
  console.log("new questions");
  console.log(questions);
  questionsLength = questions.length;
  ii = 0;
  console.log('first i = ' + ii);
  console.log('questions length = ' + questionsLength);

  // hide start page
  $("#question").html(showQuestionTemplate(questions[ii]['question']));
  $("#answer").hide();
  if (start) {

  $("body").on('click', '.showAnswerButton', function () {
     $("#answer").show();
     $('.showAnswerButton').hide();
   });
   // start to cycle through the questions
   $("body").on('click', '.answerButton', function () {
    clickedButton = this.id;

    console.log("click button " + clickedButton);
    console.log("i = " + ii);

    console.log(questions[ii]);

    if (clickedButton === "right") {

      let status = "easy";
      // because of variable scope has be be required here again
      // let questionsEvents = require('./events.js');
      // let question_id = questions[i].id;
      onChangeQuestionStatus(questions[ii], status);
      } else {
      let status = "hard";
      // let questionsEvents = require('./events.js');
      // let question_id = questions[i].id;
      onChangeQuestionStatus(questions[ii], status);
    }
    ii++;

    if (ii<questionsLength) {
      $("#question").html(showQuestionTemplate(questions[ii]['question']));
      $("#answer").hide();

    }


   });
 }
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
  changeQuestionStatusSuccess,
  createUserQuestionsSuccess,
  addNicknameSuccess,
  deleteNicknameSuccess,
  getProfileIdSuccess,
  showButtons,
  showCount,
  loopThroughQuestions,
  countQuestionsOfEachType
};
