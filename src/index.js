import _ from 'lodash';
// import nanoID
// maybe import time/calendar
import createUUID from './UUID';
import renderProject from './renderProject';

// I need to put these lets into a module and insert them first so that render works.
// then start modularizing tasks
// and then back to it.

let projectSubmitForm = document.querySelector(".projectSubmitForm");
let Projects = document.getElementById("Projects")
Projects.querySelector("input[id=projectForm]").addEventListener("click", (event)=>{
  projectSubmitForm.classList.toggle("show")
});

const projectSubmitButton = document.querySelector(".projectSubmitButton")
projectSubmitButton.addEventListener("click", e => {
     e.preventDefault();
     addProjectToList();
     });

const projectCloseButton = document.querySelector(".projectCloseButton")
projectCloseButton.addEventListener("click", e => {
    e.preventDefault();
    projectSubmitForm.classList.toggle("show")
    });

let projectList = [];

function Project(projectName, identifier) {
  this.projectName = projectName;
  this.identifier = identifier;
}

function addProjectToList() {
  const UUID = createUUID()
  const projectName = document.querySelector("#projectName").value;
  const addProject = new Project(projectName, UUID);
  projectList.push(addProject);
  renderProject();
  document.querySelector("#projectName").value = "";
  };

// need to get those parts to export
// import '/script.js'; 
// import _ from './script';


function component() {
    const element = document.createElement('div');
  
    // Lodash, currently included via a script, is required for this line to work
    element.innerHTML = _.join(['buh', 'booyah'], ' ');
    return element;
  }
  
  document.body.appendChild(component());
