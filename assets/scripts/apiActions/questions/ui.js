'use strict';

const app = require('../../app.js');
const api = require('./api.js');

const showQuestionTemplate = require('../../../templates/showquestion.handlebars');

const success = (data) => {
  if (data) {
    console.log(data);
  } else {
    console.log('Success');
  }
};

const failure = (error) => {
  console.error(error);
};

// const clickthis = function () {
//   $('#question').html(showQuestionTemplate(data));
// };
//  let data = {animal : "fish"};


 const populatingQuestions = function (data) {
  let questions = data["questions"];

   for (var i = 0; i < questions.length; i++) {
     let question = questions[i];
     $("#question").html(showQuestionTemplate(question));
     $("button").click(function() {
    let clickedButton = this.id;
    if (clickedButton === "right") {
      console.log("this is the got it button with id: ", clickedButton);
    } else {
      console.log("this is the next time button with id: ", clickedButton);
    };

   });
   };

  //  let question = questions[0]
  //  console.log("this is the whole question ", questions[0]);
  //  console.log("this is the title ", questions[0].title);
  //  console.log("this is the answers array ", questions[0].answer);

 };
 //
 // const populatingQuestions = function (data) {
 //  console.log(data);
 //
 //   let questions = data["questions"];
 //   let question = questions[0]
 //   console.log("this is the whole question ", questions[0]);
 //  //  console.log("this is the title ", questions[0].title);
 //  //  console.log("this is the answers array ", questions[0].answer);
 //  $("#question").html(showQuestionTemplate(question));
 // };

module.exports = {
  success,
  failure,
  populatingQuestions,
};
