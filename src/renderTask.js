import addTaskToList from './addTaskToList';
import addProjectToList from './addProjectToList';

function renderTask(taskArray) {
  let taskHolder = document.getElementById("taskHolder");
  taskHolder.innerHTML = '';

    let i;
    for (i = 0; i < taskArray.length; i++) {    
      let taskContainer = document.createElement("div");
      taskContainer.setAttribute("id", "TC" + taskArray[i].taskID);
      taskContainer.innerText = taskArray[i].taskName;
      document.getElementById("taskHolder").appendChild(taskContainer);
      //addTaskName(i)
        //   addTaskDropdown() etc 
      console.log(taskArray)
    }
}

function addTaskName(i) {
    let TaskName = document.createElement("span");
    taskName.setAttribute("id", "TN" + taskArray[i].taskID);
    taskContainer.innerText = taskArray[i].taskName;
    document.getElementById("TC" + taskArray[i].taskID).appendChild(taskName);

}

// use this to find the projectName:
// let taskProjectCurrentTitle = addProjectToList.projectList.find(x => x.identifier === taskProjectID).projectName;




function addTaskDropdown() {
    let addTaskDropdown = document.createElement("input");
    addTaskDropdown.setAttribute("type", "checkbox");
    addTaskDropdown.setAttribute("id", "CB" + taskArray[i].taskID);
    document.getElementById("taskHolder").appendChild(addTaskDropdown)
  }

// display will show status, name, date, notes, project, delete.
// each one will be a capsule added to container
// methods from addTask to list will need to be added to change each.
// start off with just display, then write methods.


export default renderTask;


// const addTask = new Task(taskName, taskID, taskPriority, taskDue, taskNotes, taskProject);

//   const projectList = addProjectToList.projectList
//   const projectUUID = addProjectToList.projectList[addProjectToList.projectList.length-1].identifier;
//   const projectName = addProjectToList.projectList[addProjectToList.projectList.length-1].projectName;

//   let projectContainer = document.createElement("div");
//   projectContainer.classList.add("project-container");
//   projectContainer.setAttribute("id", "C" + projectUUID);
 
//   document.getElementById('projectHolder').appendChild(projectContainer);
//   addProjectCheckbox(projectUUID);
//   addProjectText(projectUUID, projectName);
//   editProjectText(projectUUID, projectName);
//   addProjectTrashButton(projectUUID);
//   addProjectOpenButton(projectUUID);
// };



// function addProjectText(projectUUID, projectName) {
//     let projectContainerTextHolder = document.createElement("span");
//     projectContainerTextHolder.classList.add("projectContainerTextHolder");
//     projectContainerTextHolder.setAttribute("id", "TH" + projectUUID);
//     projectContainerTextHolder.setAttribute("contentEditable", true);
//     projectContainerTextHolder.setAttribute("onkeypress", "return (this.innerText.length <= 25)");
  
//     document.getElementById("C" + projectUUID).appendChild(projectContainerTextHolder);
//     let projectContainerText = document.createTextNode(projectName);
//     document.getElementById("TH" + projectUUID).appendChild(projectContainerText);
//     activateProjectCheckbox(projectUUID, projectContainerTextHolder)
//   };

// function activateProjectCheckbox(projectUUID, projectContainerTextHolder) {
//     let thisProjectContainer = document.getElementById("C" + projectUUID)
//     thisProjectContainer.querySelector("input[type=checkbox]").addEventListener("click", (event)=>{
//     projectContainerTextHolder.classList.toggle("done")
//     })
// };

// function editProjectText(projectUUID, projectName) {
//     let newProjectContainerTextHolder = document.getElementById("TH" + projectUUID);
//     newProjectContainerTextHolder.addEventListener('input', function() {  
//     const newProjectContainerText = newProjectContainerTextHolder.textContent;
//     addProjectToList.changeProjectName(projectUUID, newProjectContainerText)
//     })
// // it would be nice to dynamically change the task list heading too if currently showing
    
//     newProjectContainerTextHolder.addEventListener('keydown', function(e) {
//         if (e.key === 'Enter') {
//             e.preventDefault();
//         }
//       });
//   };

// function addProjectTrashButton(projectUUID) {
//     let projectTrashButton = document.createElement("button") 
//     projectTrashButton.setAttribute("class", "projectTrashButton icon-button right")
//     projectTrashButton.setAttribute("id", "TB" + projectUUID)
//     document.getElementById("C" + projectUUID).appendChild(projectTrashButton);
  
//     let projectTrashIcon = document.createElement("span") 
//     projectTrashIcon.setAttribute("class", "glyphicon glyphicon-trash")
//     document.getElementById("TB" + projectUUID).appendChild(projectTrashIcon);
  
//     projectTrashButton.addEventListener("click", function(event) {
//       const deleteDivTarget = document.getElementById("C" + projectUUID);
//       projectHolder.removeChild(deleteDivTarget);
//       addProjectToList.deleteObject(projectUUID);
//     })
//   };
    
// function addProjectOpenButton(projectUUID) {
//     let projectOpenButton = document.createElement("button") 
//     projectOpenButton.setAttribute("class", "projectOpenButton icon-button right")
//     projectOpenButton.setAttribute("id", "OB" + projectUUID)
//     document.getElementById("C" + projectUUID).appendChild(projectOpenButton);
  
//     let projectOpenIcon = document.createElement("span") 
//     projectOpenIcon.setAttribute("class", "glyphicon glyphicon-zoom-in")
//     document.getElementById("OB" + projectUUID).appendChild(projectOpenIcon);
//     projectOpenButton.addEventListener("click", function(event){
//       openProject(projectUUID)
//     }
//     );
//   }

// function openProject(projectUUID) { 
//   let projectPrefixSpan = document.getElementById('projectPrefix');
//   let projectHeadlineSpan = document.getElementById('projectHeadline');  
//   projectPrefixSpan.innerHTML = '';
//   projectHeadlineSpan.innerHTML = '';
//   const projectIndex = addProjectToList.projectList.findIndex((el) => el.identifier === projectUUID);
//   let taskProjectPrefix = document.createTextNode('Project: ');
//   let taskProjectHead = document.createTextNode(addProjectToList.projectList[projectIndex].projectName);

//   document.getElementById('projectPrefix').appendChild(taskProjectPrefix); 
//   document.getElementById('projectHeadline').appendChild(taskProjectHead); 

