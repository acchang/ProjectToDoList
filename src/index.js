import createProjectListeners from './createProjectListeners';
createProjectListeners();

import createTaskListener from './createTaskListener';
createTaskListener();

import createTaskInput from './createTaskInput';
createTaskInput();

// addTasktoList uses module and constructors with nanoID to create List

// use below to test if changes coming through.

import _ from 'lodash';

function component() {
    const element = document.createElement('div');
    // Lodash, currently included via a script, is required for this line to work
    element.innerHTML = _.join(['check', 'webpaq'], ' ');
    return element;
  }
document.body.appendChild(component());



// maybe import time/calendar

// modularize tasks after project done
// and then back to finish code.

// import '/script.js'; 
// import _ from './script';




