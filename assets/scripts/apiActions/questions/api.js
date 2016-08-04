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
                        "notes": "",
                      }
    }
  });
};

module.exports = {
  showQuestions,
  changeQuestionStatus,
  getStatusStatistics,
  createUserQuestions,
  getJointTableId,
};
