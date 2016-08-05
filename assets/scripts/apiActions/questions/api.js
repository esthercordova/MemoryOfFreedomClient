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

const getUserQuestions = () => {
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
                      { "status": "",
                        "user_id": data.user.id,
                        "question_id":question_id,
                        "notes": "",
                      }
    }
  });
};

const saveNote = (user_id, question_id, notes, user_question_table_id) => {
  return $.ajax({
  method: 'PATCH',
  url: app.host + '/user_questions/' +  user_question_table_id,
  headers: {
    Authorization: 'Token token=' + app.user.token,
  },
  data:
  {"user_question":{
                      "user_id":user_id,
                      "question_id":question_id,
                      "notes":notes,
                    }
  }
});
};

const deleteNote = (user_id, question_id, notes, user_question_table_id) => {
  return $.ajax({
  method: 'PATCH',
  url: app.host + '/user_questions/' +  user_question_table_id,
  headers: {
    Authorization: 'Token token=' + app.user.token,
  },
  data:
  {"user_question":{
                      "user_id":user_id,
                      "question_id":question_id,
                      "notes":notes,
                    }
  }
});
};

const deleteQuestion = (user_question_table_id) => {
  return $.ajax(
    {
      url: app.host + '/user_questions/' +  user_question_table_id,
      method: 'DELETE',
      headers: {
        Authorization: 'Token token=' + app.user.token,
      },
    });
};

const addNickname = (nickname) => {
  return $.ajax({
    url: app.host + '/profiles',
    method: "POST",
    headers: {
      Authorization: 'Token token=' + app.user.token,
    },
    data:
    {"profile":
      { "nickname": nickname }
    }
  });
};

const deleteNickname = () => {
  return new Promise((resolve, reject) => {
  console.log("app profile " + app.user.profile);
   $.ajax(
    {
      url: app.host + '/profiles/' + app.user.profile.id,
      method: 'DELETE',
      headers: {
        Authorization: 'Token token=' + app.user.token,
      },
      success: (response) => {
        resolve(response);
      },
      error: (error) => {
        reject(error);
      }
    });
  });
};

const getProfileId = () => {
  return new Promise((resolve, reject) => {
   $.ajax({
    url: app.host + '/users/' + app.user.id,
    method: "GET",
    headers: {
      Authorization: 'Token token=' + app.user.token,
    },
    success: (response) => {
      resolve(response);
    },
    error: (error) => {
      reject(error);
    }
  });
});
};

const populateEasyBucket = () => {
  return $.ajax({
    url: app.host + '/user_questions/easy',
    method: "GET",
    headers: {
      Authorization: 'Token token=' + app.user.token,
    }
  });
};

// const populateHardBucket = () => {
//
// };
module.exports = {
  getUserQuestions,
  showQuestions,
  changeQuestionStatus,
  getStatusStatistics,
  createUserQuestions,
  getJointTableId,
  saveNote,
  deleteNote,
  deleteQuestion,
  addNickname,
  deleteNickname,
  getProfileId,
  populateEasyBucket,
  // populateHardBucket,
};
