'use strict';

const app = require('../../app.js');

const createUserQuestions = (data, question_id) => {
  return $.ajax({
  method: 'POST',
  url: app.host + '/user_questions',
  headers: {
    Authorization: 'Token token=' + app.user.token,
  },
  data:
    {"user_question":{ "status":"hard",
                        "user_id":app.user.id,
                        "question_id": question_id,
                        "notes": "",
                      }
    }
});
};

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

const changeQuestionStatus = (user_id, question_id, status,  notes) => {
  return $.ajax({
  method: 'PATCH',
  url: app.host + '/user_questions/' + question_id,
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

const saveStatus = (status, user_id, question_id, notes) => {
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

module.exports = {
  // showBuckets,
  showQuestions,
  changeQuestionStatus,
  getStatusStatistics,
  saveStatus,
  createUserQuestions
};
