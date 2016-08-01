'use strict';

const app = require('../../app.js');

const showQuestions = () => {
  return $.ajax({
    url: app.host + '/questions' ,
    method: "GET",
    headers: {
      Authorization: 'Token token=' + app.user.token,
    }
  });
};

const changeQuestionStatus = (status, user_id, question_id, notes) => {
  return $.ajax({
  method: 'PATCH',
  url: app.host + '/user_questions',
  headers: {
    Authorization: 'Token token=' + app.user.token,
  },
  data:
    { "status": status,
      "user_id": user_id,
      "question_id": question_id,
      "notes":notes,
    }
});
};

const createQuestionInJointTable = (status, user_id, question_id, notes) => {
  return $.ajax({
  method: 'POST',
  url: app.host + '/user_questions',
  headers: {
    Authorization: 'Token token=' + app.user.token,
  },
  data:
    {"user_question":{ "status":status,
                        "user_id":user_id,
                        "question_id":question_id,
                        "notes":notes,
                      }
    }
});
};

// const createQuestionInJointTable = (status, user_id, question_id, notes) => {
//   return $.ajax({
//   method: 'GET',
//   url: app.host + '/user_questions',
//   headers: {
//     Authorization: 'Token token=' + app.user.token,
//   },
// });
// };

module.exports = {
  showQuestions,
  changeQuestionStatus,
  createQuestionInJointTable,
};
