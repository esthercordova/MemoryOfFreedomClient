'use strict';
const app = require('../../app.js');

const questionsEvents = require('../questions/events.js');

const success = (data) => {
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
  questionsEvents.onPopulatingBuckets();
  // questionsEvents.onPopulatingQuestions();
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
