let projectList = [];
let projectSubmitForm = document.querySelector(".projectSubmitForm");

function Project(projectName, identifier) {
  this.projectName = projectName;
  this.identifier = identifier;
}

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

function createUUID() {
  let s = [];
  let hexDigits = "0123456789abcdef";
  for (var i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = "-";
  return s.join("");
}

function addProjectToList() {
  const UUID = createUUID()
  const projectName = document.querySelector("#projectName").value;
  const addProject = new Project(projectName, UUID);
  projectList.push(addProject);
  renderProject();
  document.querySelector("#projectName").value = "";
  };

function renderProject() {
 let projectUUID = projectList[projectList.length-1].identifier
 let projectName = projectList[projectList.length-1].projectName

 let projectContainer = document.createElement("div");
  projectContainer.classList.add("project-container");
  projectContainer.setAttribute("id", "C" + projectUUID);
  document.getElementById('projectHolder').appendChild(projectContainer);

  let projectDoneCheckbox = document.createElement("input") 
  projectDoneCheckbox.setAttribute("type", "checkbox")
  projectDoneCheckbox.setAttribute("id", "CB" + projectUUID)

  document.getElementById("C" + projectUUID).appendChild(projectDoneCheckbox);

  // I give some space to the checkbox here but when underlined it also gets marked. Is there a better way?

  let projectContainerTextHolder = document.createElement("span");
  projectContainerTextHolder.classList.add("projectContainerTextHolder");
  projectContainerTextHolder.setAttribute("id", "TH" + projectUUID);
  projectContainerTextHolder.setAttribute("contentEditable", true);
  projectContainerTextHolder.setAttribute("onkeypress", "return (this.innerText.length <= 25)");

  document.getElementById("C" + projectUUID).appendChild(projectContainerTextHolder);

  let projectContainerText = document.createTextNode(" " + projectName);
  document.getElementById("TH" + projectUUID).appendChild(projectContainerText);

 let newProjectContainerTextHolder = document.getElementById("TH" + projectUUID);
     newProjectContainerTextHolder.addEventListener('input', function() {
      let newProjectContainerText = newProjectContainerTextHolder.textContent
      console.log(newProjectContainerText);
      console.log(projectList);
      
      const index = projectList.findIndex((el) => el.identifier === projectUUID)
      projectList[index] = {
      projectName: newProjectContainerText,
      identifier: projectUUID,
      }


  });

  // move editedProjectName into projectList array
  // use find and replace

  let projectTrashButton = document.createElement("button") 
  projectTrashButton.setAttribute("class", "projectTrashButton icon-button right")
  projectTrashButton.setAttribute("id", "TB" + projectUUID)
  document.getElementById("C" + projectUUID).appendChild(projectTrashButton);

  let projectTrashIcon = document.createElement("span") 
  projectTrashIcon.setAttribute("class", "glyphicon glyphicon-trash")
  document.getElementById("TB" + projectUUID).appendChild(projectTrashIcon);

  projectTrashButton.addEventListener("click", function(event){
    const deleteDivTarget = document.getElementById("C" + projectUUID);
    projectHolder.removeChild(deleteDivTarget);
    projectList = projectList.filter(object => object.identifier !== projectUUID);
  })

  let thisProjectContainer = document.getElementById("C" + projectUUID)
  thisProjectContainer.querySelector("input[type=checkbox]").addEventListener("click", (event)=>{
    projectContainerTextHolder.classList.toggle("done")
  });
  
  let projectOpenButton = document.createElement("button") 
  projectOpenButton.setAttribute("class", "projectOpenButton icon-button right")
  projectOpenButton.setAttribute("id", "OB" + projectUUID)
  document.getElementById("C" + projectUUID).appendChild(projectOpenButton);

  let projectOpenIcon = document.createElement("span") 
  projectOpenIcon.setAttribute("class", "glyphicon glyphicon-zoom-in")
  document.getElementById("OB" + projectUUID).appendChild(projectOpenIcon);

  projectOpenButton.addEventListener("click", function(event){ 
    let taskProjectHead = document.createTextNode(" " + projectList[projectList.length-1].projectName);
    document.getElementById("TaskListContainer").appendChild(taskProjectHead); 
    e.preventDefault();
    // put projectList[projectList.length-1].projectName in taskListcontainer with name at top  
    // why is it staying at the same taskProjectHead?
    // also need some way of formatting.
  })

}







// button to add task
// task goes into taskList which needs to be associated with project

// let taskList = []
// let id = the task we're in

// function Task(taskName, dueDate, priority, done, trashTask, notes) {
// // expand to add done, comment and delete
//     this.taskName = taskName;
//     this.dueDate = dueDate;
//     this.priority = priority;
//     this.done = done;
//     this.trashTask = trashTask;
//     this.notes = notes
// }
// I can hide the notes field the same way I hid projects input

// function addTaskToList() {
//     let taskName = document.querySelector("#taskName").value;
//     let dueDate = document.querySelector("#dueDate").value;
//     let priority = document.querySelector("#priority").value;
//     let done = document.querySelector("#done").checked;
//     let trashTask = document.querySelector("#trashTask").checked;
//     let notes = document.querySelector("#notes").value;
//     var addTask = new Task(title, fname, lname, pubDate, contrib, own);
//     taskList.push(addTask);
//     render();
//     document.querySelector("#taskName").value = "";
//     document.querySelector("#dueDate").value = "";
//     document.querySelector("#priority").value = "";
//     document.querySelector("#done").checked = false;
//     document.querySelector("#trashTask").checked = false;
//     document.querySelector("#notes").value = "";
//    };
