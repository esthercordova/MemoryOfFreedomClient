'use strict';
const app = require('../../app.js');

const questionsEvents = require('../questions/events.js');
const showStartTemplate = require('../../../templates/start.handlebars');
// const showQuestionTemplate = require('../../../templates/showquestion.handlebars');

const success = (data) => {
  console.log("data in success is ", data);
  if(data){
    console.log(data);
  } else {
    console.log("success");
  }
};

const failure = (error) => {
  console.error(error);
};

const signInSuccess = (data) => {
  app.user = data.user;
  $(".start").html(showStartTemplate(data));
  return data;
};

const signOutSuccess = function (){
  app.user = null;
  console.log(app);
};


module.exports = {
  failure,
  success,
  signInSuccess,
  signOutSuccess,
};
