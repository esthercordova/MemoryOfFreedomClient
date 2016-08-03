'use strict';
const app = require('../../app.js');

const questionsEvents = require('../questions/events.js');
const showStartTemplate = require('../../../templates/start.handlebars');
// const showQuestionTemplate = require('../../../templates/showquestion.handlebars');

$(window).load(function(){
     $('#question').hide();
     $('#navSettings').hide();
     $('#navSignOut').hide();
  });


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

const passwordFailure = () => {
  $('#changePasswordMessage').html('Your password is not correct. Try again');
};

const changePasswordSuccess = () => {
  $('#changePasswordMessage').html('You successfully changed your password.');
  $('#signUpMessage').html('');
  $('#signOutMessage').html('');
  $('#signInMessage').html('');
  $('#question').show();
};

const signInSuccess = (data) => {
  app.user = data.user;
  $(".start").html(showStartTemplate(data));
  $('#signInMessage').html('You successfully logged in!');
  $('#signUpMessage').html('');
  $('#signOutMessage').html('');
  $('#changePasswordMessage').html('');
  $('#question').show();
  $('#navSignIn').hide();
  $('#navSignUp').hide();
  $('#navSettings').show();
  $('#navSignOut').show();
  return data;
};

const signInFailure = () => {
  $('#signInMessage').html('Password or Username is wrong, try again!');
};

const signOutSuccess = () => {
  app.user = null;
  $('#signInMessage').html('');
  $('#signOutMessage').html("It's sad to see you leave... Come back soon.");
  $('#signUpMessage').html('');
  $('#changePasswordMessage').html('');
  $('#question').hide();
  $('#navSignIn').show();
  $('#navSignUp').show();
  $('#navSettings').hide();
  $('#navSignOut').hide();
  console.log(app);
};

module.exports = {
  failure,
  success,
  signInSuccess,
  signOutSuccess,
  passwordFailure,
  changePasswordSuccess,
  signInFailure,

};
