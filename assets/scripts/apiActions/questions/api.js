'use strict';

const app = require('../../app.js');

const getStatusStatistics = () => {
  return $.ajax({
    url: app.host + '/user_questions',
    method: "GET",
    headers: {
      Authorization: 'Token token=' + app.user.token,
    }
  });
};

const showQuestions = () => {
  return $.ajax({
    url: app.host + '/questions' ,
    method: "GET",
    headers: {
      Authorization: 'Token token=' + app.user.token,
    }
  });
};

// 1. ajax to /user_questions/find/'wit a get with user_id and the question_id
//this will return the id in the row we are looking for
//than we PATCH
//console log

// very first just hardcode to see if root is working

const getJointTableId = (question_id, user_id) => {
  return $.ajax({
    url: app.host + '/user_question/find/',
    method: "GET",
    headers: {
      Authorization: 'Token token=' + app.user.token,
    },
    data: {
      "user_id": user_id,
      "question_id": question_id
    }
  });
};

const changeQuestionStatus = (user_id, question_id, status,  notes, user_question_table_id) => {
  return $.ajax({
  method: 'PATCH',
  url: app.host + '/user_questions/' +  user_question_table_id,
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

const createUserQuestions = (data, question_id) => {
  return $.ajax({
    url: app.host + '/user_questions',
    method: "POST",
    headers: {
      Authorization: 'Token token=' + app.user.token,
    },
    data:
    {"user_question":
                      { "status": "hard",
                        "user_id": data.user.id,
                        "question_id":question_id,
                        "notes": "notes",
                      }
    }
  });
};

// const saveStatus = (status, user_id, question_id, notes) => {
//   return $.ajax({
//   method: 'POST',
//   url: app.host + '/user_questions',
//   headers: {
//     Authorization: 'Token token=' + app.user.token,
//   },
//   data:
//     {"user_question":{ "status":status,
//                         "user_id":user_id,
//                         "question_id":question_id,
//                         "notes":notes,
//                       }
//     }
// });
// };

module.exports = {
  showQuestions,
  changeQuestionStatus,
  getStatusStatistics,
  createUserQuestions,
  getJointTableId,
  // saveStatus,

};
