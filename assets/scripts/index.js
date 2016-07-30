'use strict';

const authEvents = require('./auth/events.js');

const questionsEvents = require('./apiActions/questions/events.js');

// On document ready
$(() => {
  authEvents.addHandlers();
  questionsEvents.addHandlers();
});
