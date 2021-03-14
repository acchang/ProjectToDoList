// import list and then render?
import addProjectToList from './addProjectToList';
// get addProjectToList.projectList

function renderProject() {
  console.log("Render: " + addProjectToList.projectList)
  // let appendTest = addProjectToList.projectList
  // document.getElementById("projectHolder").appendChild(appendTest)
};

// take projectName and projectUUID from the latest in the array
// maybe just build something simple to test
// append to id ="projectHolder"


// function addProjectCheckbox(projectUUID) {
//     let projectDoneCheckbox = document.createElement("input");
//     projectDoneCheckbox.setAttribute("type", "checkbox");
//     projectDoneCheckbox.setAttribute("id", "CB" + projectUUID);
//     document.getElementById("C" + projectUUID).appendChild(projectDoneCheckbox)
//   }

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

// function editProjectText(projectUUID, projectName) {
//     let newProjectContainerTextHolder = document.getElementById("TH" + projectUUID);
//     newProjectContainerTextHolder.addEventListener('input', function() {    
//         let newProjectContainerText = newProjectContainerTextHolder.textContent
//         // const index = projectList.findIndex((el) => el.identifier === projectUUID);
//         // projectList[index].projectName = newProjectContainerText
//         // projectName = projectList[projectList.length-1].projectName
//         // console.log(projectList)

//         const index = this.projectList.findIndex((el) => el.identifier === projectUUID);
//         this.projectList[index].projectName = newProjectContainerText
//         projectName = this.projectList[this.projectList.length-1].projectName
//         console.log(this.projectList)

//         });
  
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

//       // projectList = projectList.filter(object => object.identifier !== projectUUID);
//       this.projectList = this.projectList.filter(object => object.identifier !== projectUUID);

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
//     projectOpenButton.addEventListener("click", function(event){openProject(projectUUID)}
//     );
//   }

// function activateProjectCheckbox(projectUUID, projectContainerTextHolder) {
//     let thisProjectContainer = document.getElementById("C" + projectUUID)
//     thisProjectContainer.querySelector("input[type=checkbox]").addEventListener("click", (event)=>{
//     projectContainerTextHolder.classList.toggle("done")
//     })
//   };
  
// function openProject(projectUUID) {
//     let projectPrefixSpan = document.getElementById('projectPrefix');
//     let projectHeadlineSpan = document.getElementById('projectHeadline');
  
//     let taskProjectHolder = document.getElementById('taskProjectHolder');
//     taskProjectHolder.innerText = '';
  
  
//     projectPrefixSpan.innerHTML = '';
//     projectHeadlineSpan.innerHTML = '';

//     // const projectIndex = projectList.findIndex((el) => el.identifier === projectUUID)
//     const projectIndex = this.projectList.findIndex((el) => el.identifier === projectUUID)

//     let taskProjectPrefix = document.createTextNode('Project: ');

//     // let taskProjectHead = document.createTextNode(projectList[projectIndex].projectName);
//     let taskProjectHead = document.createTextNode(this.projectList[projectIndex].projectName);

//     document.getElementById('projectPrefix').appendChild(taskProjectPrefix); 
//     document.getElementById('projectHeadline').appendChild(taskProjectHead); 
//     // render/populate the TaskHolder with the TaskList that corresponds with the projectUUID
//     console.log(this.projectList)
//     createTaskInput()
//   }





//   // let projectUUID = projectList[projectList.length-1].identifier
//   let projectUUID = this.projectList[this.projectList.length-1].identifier

//   let projectContainer = document.createElement("div");
//   projectContainer.classList.add("project-container");
//   projectContainer.setAttribute("id", "C" + projectUUID);

//   // let projectName = projectList[projectList.length-1].projectName;
//   let projectName = this.projectList[this.projectList.length-1].projectName;
 
//   document.getElementById('projectHolder').appendChild(projectContainer);
//   addProjectCheckbox(projectUUID);
//   addProjectText(projectUUID, projectName);
//   editProjectText(projectUUID, projectName);
//   addProjectTrashButton(projectUUID);
//   addProjectOpenButton(projectUUID);
//   activateProjectCheckbox(projectUUID, projectContainerTextHolder);
//   openProject(projectUUID);


export default renderProject;