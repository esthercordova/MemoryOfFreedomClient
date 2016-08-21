'use strict';

const app = require('../../app.js');
const api = require('./api.js');

const showQuestionTemplate = require('../../../templates/showquestion.handlebars');
const showStatisticTemplate = require('../../../templates/statistic.handlebars');
const chooseWhatToStudyTemplate = require('../../../templates/chooseWhatToStudy.handlebars');

let questionsLength;
let questionIndex;
let clickedButton;
let questions;
let firstTime = true;

/*
 * Display buttons to choose which questions to study
 * @param {Object} countObject
 */
const showButtons = (countObject) => {
  $('.start').show();
  $('.start').html(chooseWhatToStudyTemplate(countObject));
};

/*
 * Display statistic template with information from countObject
 * @param {Object} countObject
 */
const showCount = (countObject) => {
  $("#statistic").html(showStatisticTemplate(countObject));
};

/*
 * Count how many easy/hard/new questions there are
 * @param {Booloan} shouldShowButtons
 */
const countQuestionsOfEachType = (shouldShowButtons) => {
  // get all the questions that belong to the user from the database
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
    // invoke showCount function with countObject to display statistic
    showCount(countObject);
    if (shouldShowButtons) {
      showButtons(countObject);
    }
  });
};

/*
 * Update the status of user question in database
 * @param {object} question
 * @param {string} status - "easy", "hard", ""
 */
const onChangeQuestionStatus = (question, status) => {
  let user_question_id = question.id;
  let question_id = question['question'].id;
  let user_id = app.user.id;
  let notes = "";
  // make ajax PATCH to update question status
  api.changeQuestionStatus(user_id, question_id, status,notes,user_question_id)
    .then(function () {
      countQuestionsOfEachType(false);
    }).then(function () {
    // show which questions to study template when
    // all questions have been updated
      if (questionIndex >= questionsLength) {
        countQuestionsOfEachType(true);
      }
  })
  .fail(function(error){
    reject(error);
  });
};

/*
 * Main loop to show and answer questions
 * @param {object} questions - all questions with same status
 */
const loopThroughQuestions = (questions) => {
  questionsLength = questions.length;
  questionIndex = 0;
  $("#question").html(showQuestionTemplate(questions[questionIndex]['question']));
  $("#answer").hide();
  if (firstTime) {
    firstTime = false;
    // when show answer button is clicked it shows the answer and hides the button
    $("body").on('click', '.showAnswerButton', function () {
      $("#answer").show();
      $('.showAnswerButton').hide();
   });
   // start to cycle through the questions
   $("body").on('click', '.answerButton', function () {
    clickedButton = this.id;
    if (clickedButton === "right") {
      let status = "easy";
      // because of variable scope has be be required here again
      onChangeQuestionStatus(questions[questionIndex], status);
      } else {
      let status = "hard";
      onChangeQuestionStatus(questions[questionIndex], status);
    }
    // keep track of question index to stop once max length is reached
    questionIndex++;
    if (questionIndex < questionsLength) {
      $("#question").html(showQuestionTemplate(questions[questionIndex]['question']));
      $("#answer").hide();
    }
   });
 }
};

/*
 * Add nickname to database
 */
const addNicknameSuccess = () => {
  $('#nickname').val(' ');
  api.getProfileId()
  .then((res) => {
    app.user.profile = res.user.profile;
    // take care of display logic on user interface
    $('#nicknameDelete').removeClass('hide');
    $('#nicknameSubmit').addClass('hide');
    $('#nickname').addClass('borderless');
    $('#nickname').val(app.user.profile.nickname);
  });
};

/*
 * Delete nickname from database
 */
const deleteNicknameSuccess = () => {
  app.profiles = null;
  $('#nicknameDelete').addClass('hide');
  $('#nicknameSubmit').removeClass('hide');
  $('#nickname').removeClass('borderless');
  $('#nickname').val(' ');
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
