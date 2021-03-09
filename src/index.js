import _ from 'lodash';
import createUUID from './UUID';
import renderProject from './renderProject';

let projectList = [];
let taskList = [];
let projectSubmitForm = document.querySelector(".projectSubmitForm");

let Projects = document.getElementById("Projects")
// Projects.querySelector("input[id=projectForm]").addEventListener("click", (event)=>{
//   projectSubmitForm.classList.toggle("show")
// });

const projectSubmitButton = document.querySelector(".projectSubmitButton")
projectSubmitButton.addEventListener("click", e => {
     e.preventDefault();
     addProjectToList();
     });

const projectCloseButton = document.querySelector(".projectCloseButton")
// projectCloseButton.addEventListener("click", e => {
//     e.preventDefault();
//     projectSubmitForm.classList.toggle("show")
//     });

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

function activateProjectCheckbox(projectUUID, projectContainerTextHolder) {
  let thisProjectContainer = document.getElementById("C" + projectUUID)
  thisProjectContainer.querySelector("input[type=checkbox]").addEventListener("click", (event)=>{
  projectContainerTextHolder.classList.toggle("done")
  })
};

function openProject(projectUUID) {
  let projectPrefixSpan = document.getElementById('projectPrefix');
  let projectHeadlineSpan = document.getElementById('projectHeadline');

  let taskProjectHolder = document.getElementById('taskProjectHolder');
  taskProjectHolder.innerText = '';


  projectPrefixSpan.innerHTML = '';
  projectHeadlineSpan.innerHTML = '';
  const projectIndex = projectList.findIndex((el) => el.identifier === projectUUID)
  let taskProjectPrefix = document.createTextNode('Project: ');
  let taskProjectHead = document.createTextNode(projectList[projectIndex].projectName);
  document.getElementById('projectPrefix').appendChild(taskProjectPrefix); 
  document.getElementById('projectHeadline').appendChild(taskProjectHead); 
  // render/populate the TaskHolder with the TaskList that corresponds with the projectUUID
  console.log(projectList)
  createTaskInput()
}




// need to get those parts to export
// import '/script.js'; 
// import _ from './script';

function component() {
    const element = document.createElement('div');
  
    // Lodash, currently included via a script, is required for this line to work
    element.innerHTML = _.join(['ruh', 'rooyah'], ' ');
    return element;
  }
  
  document.body.appendChild(component());
