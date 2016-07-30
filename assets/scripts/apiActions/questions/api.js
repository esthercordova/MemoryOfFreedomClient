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

module.exports = {
  showQuestions,
};
