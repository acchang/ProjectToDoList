
import createProjectListeners from './createProjectListeners';

createProjectListeners();

// import renderProject from './renderProject';
// renderProject();

// error here bc projectList is not defined
// even after putting projectList into global variables via establishArrays.

// import nanoID
// maybe import time/calendar

// modularize tasks after project done
// and then back to finish code.

// import '/script.js'; 
// import _ from './script';

// use below to test if changes coming through.
import _ from 'lodash';

function component() {
    const element = document.createElement('div');
  
    // Lodash, currently included via a script, is required for this line to work
    element.innerHTML = _.join(['test1', 'test1'], ' ');
    return element;
  }

document.body.appendChild(component());
