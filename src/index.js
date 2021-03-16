import createTaskInput from './createTaskInput';
createTaskInput();

import createTaskListener from './createTaskListener';
createTaskListener();

import createProjectListeners from './createProjectListeners';
createProjectListeners();

// maybe import time/calendar
// and then back to finish code.

// use below to test if changes coming through.

import _ from 'lodash';

function component() {
    const element = document.createElement('div');
    // Lodash, currently included via a script, is required for this line to work
    element.innerHTML = _.join(['check', 'webpack'], ' ');
    return element;
  }
document.body.appendChild(component());






