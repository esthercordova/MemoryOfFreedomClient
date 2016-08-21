'use strict';

const authEvents = require('./apiActions/auth/events.js');
const questionsEvents = require('./apiActions/questions/events.js');

// On document ready, page load
$(() => {
  authEvents.addHandlers();
  questionsEvents.addHandlers();
  $('#welcomeModal').modal('show');
  $('#question').hide();
  $('#navSettings').hide();
  $('#navSignOut').hide();
});
