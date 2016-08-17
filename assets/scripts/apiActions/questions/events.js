'use strict';

const api = require('./api');
const ui = require('./ui');
const app = require('../../app');

const showChooseWhatToStudyTemplate = require('../../../templates/chooseWhatToStudy.handlebars');

// const onPopulatingQuestions = () => {
//   $('#startQuestions').hide();
//   api.showQuestions()
//   .done(ui.populatingQuestions)
//   .fail(ui.failure);
// };
//
// const onShowStatictics = (event) => {
//   event.preventDefault();
//   api.getStatusStatistics()
//   .done(ui.gettingStatistics)
//   .fail(ui.failure);
// };
//
const onChooseWhatToStudy = () => {
  ui.countQuestionsOfEachType(true);
};

//first get joint table id then PATCH
//Only difference between onChangeStatusEasy and onChangeStatusHard is the
//harcoded status variable - when time refactor

const onClickNewBucketButton = (event) => {
  event.preventDefault();
  // get all of the new user_questions
  api.getUserQuestions()
  .then(function (user_questions_object) {
    let user_questions = user_questions_object['user_questions'];
    console.log(user_questions);
    let questionsArray = [];
    for (let i in user_questions) {
      console.log(user_questions[i].status + "-----");
      if (user_questions[i].status === "") {
        questionsArray.push(user_questions[i]);
      }
    }
    console.log('in events button clicked');
    console.log(questionsArray);
    ui.loopThroughQuestions(questionsArray);
  });
};

const onClickEasyBucketButton = (event) => {
  event.preventDefault();
  // get all of the new user_questions
  api.getUserQuestions()
  .then(function (user_questions_object) {
    console.log('in easy bucket');
    console.log(user_questions_object);
    let user_questions = user_questions_object['user_questions'];
    console.log('user questions:');
    console.log(user_questions);
    let questionsArray = [];
    for (let i in user_questions) {
      if (user_questions[i].status === "easy") {
        questionsArray.push(user_questions[i]);
      }
    }
    console.log('in events button clicked');
    console.log(questionsArray);
    ui.loopThroughQuestions(questionsArray);
  });
}

const onClickHardBucketButton = (event) => {
  event.preventDefault();
  // get all of the new user_questions
  api.getUserQuestions()
  .then(function (user_questions_object) {
    console.log('in hard bucket');
    console.log(user_questions_object);
    let user_questions = user_questions_object['user_questions'];
    // console.log(user_questions);
    let questionsArray = [];
    for (let i in user_questions) {
      if (user_questions[i].status === "hard") {
        questionsArray.push(user_questions[i]);
      }
    }
    console.log('in events button clicked');
    console.log(questionsArray);
    ui.loopThroughQuestions(questionsArray);
  });
}

const onChangeQuestionStatus = () => {

};

// need to add in the end ui.gettingStatistics to update statistics on front end
const onChangeStatusEasy = (event) => {
  return new Promise(function(resolve,reject) {
  event.preventDefault();
  let user_id = app.user.id;
  let question_id = $('.giveQuestionId').attr('data-id') - 1;
  let status = "easy";
  let notes = "";
  api.getJointTableId(question_id, user_id)
  .then(function(data){
    let user_question_table_id = data.user_questions[0].id;
    console.log(data);
    console.log("user_question ID " + data.user_questions[0].id);
    console.log("question_id " + question_id + "user_id " + user_id);
    console.log("token" + app.user.token).then(function() {
      api.changeQuestionStatus( user_id,question_id,status,
        notes,user_question_table_id)
    });
  })
  .then(function(event){
    api.getStatusStatistics()
    .done(ui.gettingStatistics)
    .fail(ui.failure);
  })
  .fail(function(error){
    reject(error);
  });
});
};

const onChangeStatusHard = (event) => {
  return new Promise(function(resolve,reject) {
  event.preventDefault();
  let user_id = app.user.id;
  let question_id = $('.giveQuestionId').attr('data-id') - 1;
  let status = "hard";
  let notes = "";
  api.getJointTableId(question_id, user_id)
  .done(function(data){
    let user_question_table_id = data.user_questions[0].id;
    console.log(data);
    console.log("user_question ID " + data.user_questions[0].id);
    console.log("question_id " + question_id + "user_id " + user_id);
    console.log("token" + app.user.token);
    api.changeQuestionStatus( user_id,question_id,status, notes,user_question_table_id)
  })
  .fail(function(data){
    reject(error);
  });
});
};

// const onSaveNote = (event) => {
//   return new Promise(function(resolve,reject) {
//   event.preventDefault();
//   let question_id = $('.giveQuestionId').attr('data-id') - 1;
//   let user_id = app.user.id;
//   let notes = $("#note").val();
//   api.getJointTableId(question_id, user_id)
//   .done(function(data){
//     let user_question_table_id = data.user_questions[0].id;
//     api.saveNote( user_id,question_id, notes,user_question_table_id)
//   })
//   .fail(function(data){
//     reject(error);
//   });
// });
// };

// const onDeleteNote = (event) => {
//   return new Promise(function(resolve,reject) {
//   event.preventDefault();
//   let question_id = $('.giveQuestionId').attr('data-id') - 1;
//   let user_id = app.user.id;
//   let notes = "";
//   api.getJointTableId(question_id, user_id)
//   .done(function(data){
//     let user_question_table_id = data.user_questions[0].id;
//     api.saveNote( user_id,question_id, notes,user_question_table_id)
//   })
//   .fail(function(data){
//     reject(error);
//   });
// });
// };

// const onDeleteQuestion = (event) => {
//   return new Promise(function(resolve,reject) {
//   event.preventDefault();


//   let question_id = $('.giveQuestionId').attr('data-id');
//   let user_id = app.user.id;
//   console.log("question_id"+question_id);
//   console.log("user_id" +user_id);
//   api.getJointTableId(question_id, user_id)
//   .done(function(data){
//     let user_question_table_id = data.user_questions[0].id;
//     console.log("user_question_table_id" + user_question_table_id);
//     api.deleteQuestion(user_question_table_id)
//   })
//   .fail(function(data){
//     reject(error);
//   });
// });
// };

const onAddNickname = (event) => {
  event.preventDefault();
  let nickname = $('#nickname').val();
  console.log(nickname);
  api.addNickname(nickname)
  // .then(api.getProfileId)
  .done(ui.addNicknameSuccess)
  .fail(ui.failure);
};

const onDeleteNickname = (event) => {
//   return new Promise(function(resolve,reject) {
  event.preventDefault();
//
console.log("app profile ", app);
  api.deleteNickname()
  // .then(ui.getProfileSuccess)
  // .then(api.deleteNickname)
  .then(ui.deleteNicknameSuccess)
  .catch(error => console.error(error));
};


const addHandlers = () => {
  $(document).on('click', '#stop', onChooseWhatToStudy);
  $(document).on('click','#newBucket', onClickNewBucketButton);
  $(document).on('click','#easyBucket', onClickEasyBucketButton);
  $(document).on('click','#hardBucket', onClickHardBucketButton);

  // $(document).on('click','#saveNote', onSaveNote);
  // $(document).on('click','#deleteNote', onDeleteNote);
  // $(document).on('click','#deleteQuestion', onDeleteQuestion);

  $(document).on('click','#nicknameSubmit', onAddNickname);
  $(document).on('click','#nicknameDelete', onDeleteNickname);
};

module.exports = {
  addHandlers,
  // onPopulatingQuestions,
  // onShowStatictics,
  // onSaveNote,
  // onDeleteNote,
  // onDeleteQuestion,
  onAddNickname,
  onDeleteNickname,
};
