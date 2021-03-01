let projectList = [];
let taskList = [];
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
  let projectContainer = document.createElement("div");
  projectContainer.classList.add("project-container");
  projectContainer.setAttribute("id", "C" + projectUUID);
  let projectName = projectList[projectList.length-1].projectName;
  document.getElementById('projectHolder').appendChild(projectContainer);
  addProjectCheckbox(projectUUID);
  addProjectText(projectUUID, projectName);
  editProjectText(projectUUID, projectName);
  addProjectTrashButton(projectUUID);
  addProjectOpenButton(projectUUID);
};
 
function addProjectCheckbox(projectUUID) {
  let projectDoneCheckbox = document.createElement("input");
  projectDoneCheckbox.setAttribute("type", "checkbox");
  projectDoneCheckbox.setAttribute("id", "CB" + projectUUID);
  document.getElementById("C" + projectUUID).appendChild(projectDoneCheckbox)
}

function activateProjectCheckbox(projectUUID, projectContainerTextHolder) {
  let thisProjectContainer = document.getElementById("C" + projectUUID)
  thisProjectContainer.querySelector("input[type=checkbox]").addEventListener("click", (event)=>{
  projectContainerTextHolder.classList.toggle("done")
  })
};

function addProjectText(projectUUID, projectName) {
  let projectContainerTextHolder = document.createElement("span");
  projectContainerTextHolder.classList.add("projectContainerTextHolder");
  projectContainerTextHolder.setAttribute("id", "TH" + projectUUID);
  projectContainerTextHolder.setAttribute("contentEditable", true);
  projectContainerTextHolder.setAttribute("onkeypress", "return (this.innerText.length <= 25)");

  document.getElementById("C" + projectUUID).appendChild(projectContainerTextHolder);
  let projectContainerText = document.createTextNode(projectName);
  document.getElementById("TH" + projectUUID).appendChild(projectContainerText);
  activateProjectCheckbox(projectUUID, projectContainerTextHolder)
};

function editProjectText(projectUUID, projectName) {
  let newProjectContainerTextHolder = document.getElementById("TH" + projectUUID);
  newProjectContainerTextHolder.addEventListener('input', function() {    
      let newProjectContainerText = newProjectContainerTextHolder.textContent
      const index = projectList.findIndex((el) => el.identifier === projectUUID);
      projectList[index].projectName = newProjectContainerText
      projectName = projectList[projectList.length-1].projectName
      console.log(projectList)
      });

  newProjectContainerTextHolder.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
          e.preventDefault();
      }
    });
};

function addProjectTrashButton(projectUUID) {
  let projectTrashButton = document.createElement("button") 
  projectTrashButton.setAttribute("class", "projectTrashButton icon-button right")
  projectTrashButton.setAttribute("id", "TB" + projectUUID)
  document.getElementById("C" + projectUUID).appendChild(projectTrashButton);

  let projectTrashIcon = document.createElement("span") 
  projectTrashIcon.setAttribute("class", "glyphicon glyphicon-trash")
  document.getElementById("TB" + projectUUID).appendChild(projectTrashIcon);

  projectTrashButton.addEventListener("click", function(event) {
    const deleteDivTarget = document.getElementById("C" + projectUUID);
    projectHolder.removeChild(deleteDivTarget);
    projectList = projectList.filter(object => object.identifier !== projectUUID);
  })
};
  
function addProjectOpenButton(projectUUID) {
  let projectOpenButton = document.createElement("button") 
  projectOpenButton.setAttribute("class", "projectOpenButton icon-button right")
  projectOpenButton.setAttribute("id", "OB" + projectUUID)
  document.getElementById("C" + projectUUID).appendChild(projectOpenButton);

  let projectOpenIcon = document.createElement("span") 
  projectOpenIcon.setAttribute("class", "glyphicon glyphicon-zoom-in")
  document.getElementById("OB" + projectUUID).appendChild(projectOpenIcon);
  projectOpenButton.addEventListener("click", function(event){openProject(projectUUID)}
  );
}

function openProject(projectUUID) {
  let projectPrefixSpan = document.getElementById('projectPrefix');
  let projectHeadlineSpan = document.getElementById('projectHeadline');
  let taskProjectHolder = document.getElementById('taskProjectHolder');
  taskProjectHolder.innerHTML = '';
  projectPrefixSpan.innerHTML = '';
  projectHeadlineSpan.innerHTML = '';
  const projectIndex = projectList.findIndex((el) => el.identifier === projectUUID)
  let taskProjectPrefix = document.createTextNode('Project: ');
  let taskProjectHead = document.createTextNode(projectList[projectIndex].projectName);
  document.getElementById('projectPrefix').appendChild(taskProjectPrefix); 
  document.getElementById('projectHeadline').appendChild(taskProjectHead); 
  // render/populate the TaskHolder with the TaskList that corresponds with the projectUUID
  console.log(projectList)
}

function getProjectIdentifier() {
  let taskProjectTitleSpace = document.getElementById('projectHeadline');
  let taskProjectTitle = taskProjectTitleSpace.textContent;
  const projectIndex = projectList.findIndex((el) => el.projectName === taskProjectTitle);
  taskProjectIdentifier = projectList[projectIndex].identifier;
  return(taskProjectIdentifier)
};

let taskBtn = document.getElementById("taskBtn");
taskBtn.addEventListener("click", function(event){
  let taskInputContainer = document.createElement("div");
  taskInputContainer.setAttribute("id", "taskInputContainer");
  // taskInputContainer.textContent = "taskInputContainer"
  document.getElementById('taskProjectHolder').appendChild(taskInputContainer);
  createTaskPriorityField();
  createTaskField();
  createTaskCalendarField();
  createTaskNotesField();
  createTaskProjectField();
});

function createTaskField() {
  let taskInputFieldHolder = document.createElement("span");
  taskInputFieldHolder.setAttribute("id", "taskInputFieldHolder");
  document.getElementById('taskInputContainer').appendChild(taskInputFieldHolder);

  let taskInputField = document.createElement("input");
  taskInputField.setAttribute("id", "taskInputField");
  taskInputField.setAttribute("type", "text");
  taskInputField.setAttribute("maxlength", "45");
  taskInputField.setAttribute("size", "45");
  taskInputField.setAttribute("placeholder", "Add task name here");
  taskInputField.classList.add("task-input");
  document.getElementById('taskInputFieldHolder').appendChild(taskInputField);
};

function createTaskPriorityField() {
  let taskPriorityDropdown = document.createElement("span");
  taskPriorityDropdown.setAttribute("id", "taskPriorityDropdown");
  taskPriorityDropdown.setAttribute("class", "dropdown");
  document.getElementById('taskInputContainer').appendChild(taskPriorityDropdown);

  let taskPriorityButton = document.createElement("button");
  taskPriorityButton.setAttribute("id", "taskPriorityButton");
  taskPriorityButton.setAttribute("class", "dropbtn");
  taskPriorityButton.innerText = "priority";
  taskPriorityButton.addEventListener("click", function(event) {myFunction()});
  document.getElementById('taskPriorityDropdown').appendChild(taskPriorityButton);

  let taskPriorityIcon = document.createElement("span") 
  taskPriorityIcon.setAttribute("class", "glyphicon glyphicon-sort")
  document.getElementById("taskPriorityButton").appendChild(taskPriorityIcon);

  // I want these to change to the top field and then be recorded.
  // I also want the button to be a priority icon

  let taskPriorityField = document.createElement("div");
  taskPriorityField.setAttribute("id", "taskPriorityChoices");
  taskPriorityField.setAttribute("class", "dropdown-content");
  document.getElementById('taskPriorityDropdown').appendChild(taskPriorityField);

  let priorityOne = document.createElement("a");
  priorityOne.setAttribute("href", "http://cnn.com");
  priorityOne.innerText = "Hi"
  document.getElementById('taskPriorityChoices').appendChild(priorityOne);

  let priorityTwo = document.createElement("a");
  priorityTwo.setAttribute("href", "http://nyt.com");
  priorityTwo.innerText = "Med"
  document.getElementById('taskPriorityChoices').appendChild(priorityTwo);

  let priorityThree = document.createElement("a");
  priorityThree.setAttribute("href", "http://reddit.com");
  priorityThree.innerText = "Low"
  document.getElementById('taskPriorityChoices').appendChild(priorityThree);

  let priorityFour = document.createElement("a");
  priorityFour.setAttribute("href", "http://google.com");
  priorityFour.innerText = "Done"
  document.getElementById('taskPriorityChoices').appendChild(priorityFour);

  function myFunction() {
    document.getElementById("taskPriorityChoices").classList.toggle("show");
  }

  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      let dropdowns = document.getElementsByClassName("dropdown-content");
      let i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }
};


function createTaskCalendarField() {
  let taskCalendarField = document.createElement("span");
  taskCalendarField.setAttribute("id", "taskCalendarField");
  document.getElementById('taskInputContainer').appendChild(taskCalendarField);

  let taskCalendarButton = document.createElement("button");
  taskCalendarButton.setAttribute("id", "taskCalendarButton");
  taskCalendarButton.innerText = "due date ";
  document.getElementById('taskCalendarField').appendChild(taskCalendarButton);

  let taskCalendarIcon = document.createElement("span") 
  taskCalendarIcon.setAttribute("class", "glyphicon glyphicon-calendar");
  document.getElementById("taskCalendarButton").appendChild(taskCalendarIcon);
}

// notes hide and show
function createTaskNotesField() {
  let taskNotesField = document.createElement("span");
  taskNotesField.setAttribute("id", "taskNotesField");
  document.getElementById('taskInputContainer').appendChild(taskNotesField);

  let taskNotesButton = document.createElement("button");
  taskNotesButton.setAttribute("id", "taskNotesButton");
  taskNotesButton.innerText = "notes ";
  document.getElementById('taskNotesField').appendChild(taskNotesButton);

  let taskNotesIcon = document.createElement("span") 
  taskNotesIcon.setAttribute("class", "glyphicon glyphicon-edit");
  document.getElementById("taskNotesButton").appendChild(taskNotesIcon);
};


// project with default, option to change?
// goes hidden after entering
function createTaskProjectField() {
  let taskProjectField = document.createElement("span");
  taskProjectField.setAttribute("id", "taskProjectField");
  document.getElementById('taskInputContainer').appendChild(taskProjectField);

  let taskProjectButton = document.createElement("button");
  taskProjectButton.setAttribute("id", "taskProjectButton");
  taskProjectButton.innerText = "project ";
  document.getElementById('taskProjectField').appendChild(taskProjectButton);

  let taskProjectIcon = document.createElement("span") 
  taskProjectIcon.setAttribute("class", "glyphicon glyphicon-folder-open");
  document.getElementById("taskProjectButton").appendChild(taskProjectIcon);
};









// function renderTask() {
//   let taskUUID = createUUID();
//   addTaskCheckbox(taskUUID);
//   addTaskText(taskUUID, taskName);
  // editTaskText(taskUUID, taskName);
  // addTaskButton(taskUUID);
  // addTaskOpenButton(taskUUID);
  // getProjectIdentifier()
  // addTaskToList()
// }

// function addTaskCheckbox(taskUUID) {
//   let taskDoneCheckbox = document.createElement("input");
//   taskDoneCheckbox.setAttribute("type", "checkbox");
//   taskDoneCheckbox.setAttribute("id", "CB" + taskUUID);
//   document.getElementById("C" + taskUUID).appendChild(taskDoneCheckbox)
// }

// function activateTaskCheckbox(taskUUID, projectContainerTextHolder) {
//   let thisProjectContainer = document.getElementById("C" + projectUUID)
//   thisProjectContainer.querySelector("input[type=checkbox]").addEventListener("click", (event)=>{
//   projectContainerTextHolder.classList.toggle("done")
//   })
// };

// function addTaskText(taskUUID, taskName) {
//   let taskTextHolder = document.createElement("input");
//   taskContainerTextHolder.classList.add("taskContainerTextHolder");
//   taskContainerTextHolder.setAttribute("type", "text");
//   // taskContainerTextHolder.setAttribute("id", "TH" + projectUUID);
//   // projectContainerTextHolder.setAttribute("contentEditable", true);
//   // taskContainerTextHolder.setAttribute("onkeypress", "return (this.innerText.length <= 25)");

//   document.getElementById("C" + projectUUID).appendChild(projectContainerTextHolder);
//   let projectContainerText = document.createTextNode(projectName);
//   document.getElementById("TH" + projectUUID).appendChild(projectContainerText);
//   activateProjectCheckbox(projectUUID, projectContainerTextHolder)
// };

// function addtaskTrashButton(taskUUID) {
//   let taskTrashButton = document.createElement("button") 
//   taskTrashButton.setAttribute("class", "taskTrashButton icon-button right")
//   taskTrashButton.setAttribute("id", "TB" + projectUUID)
//   document.getElementById("C" + projectUUID).appendChild(taskTrashButton);

//   let taskTrashIcon = document.createElement("span") 
//   taskTrashIcon.setAttribute("class", "glyphicon glyphicon-trash")
//   document.getElementById("TB" + projectUUID).appendChild(taskTrashIcon);

//   taskTrashButton.addEventListener("click", function(event) {
//     const deleteDivTarget = document.getElementById("C" + taskUUID);
//     taskHolder.removeChild(deleteDivTarget);
//     taskList = taskList.filter(object => object.identifier !== taskUUID);
//   })
// };
  
// function addProjectOpenButton(projectUUID) {
//   let projectOpenButton = document.createElement("button") 
//   projectOpenButton.setAttribute("class", "projectOpenButton icon-button right")
//   projectOpenButton.setAttribute("id", "OB" + projectUUID)
//   document.getElementById("C" + projectUUID).appendChild(projectOpenButton);

//   let projectOpenIcon = document.createElement("span") 
//   projectOpenIcon.setAttribute("class", "glyphicon glyphicon-zoom-in")
//   document.getElementById("OB" + projectUUID).appendChild(projectOpenIcon);
//   projectOpenButton.addEventListener("click", function(event){openProject(projectUUID)}
//   );
// }





function Task(taskName, dueDate, priority, done, trashTask, notes) {
    this.priority = priority;
    this.taskName = taskName;
    this.dueDate = dueDate;
    this.projectIdentifier = projectIdentifier;
    this.trashTask = trashTask;
    this.notes = notes
}

function addTaskToList() {
    let taskName = document.querySelector("#taskName").value;
    let dueDate = document.querySelector("#dueDate").value;
    let priority = document.querySelector("#priority").value;
    let done = document.querySelector("#done").checked;
    let trashTask = document.querySelector("#trashTask").checked;
    let notes = document.querySelector("#notes").value;
    var addTask = new Task(title, fname, lname, pubDate, contrib, own);
    taskList.push(addTask);
    render();
    document.querySelector("#taskName").value = "";
    document.querySelector("#dueDate").value = "";
    document.querySelector("#priority").value = "";
    document.querySelector("#done").checked = false;
    document.querySelector("#trashTask").checked = false;
    document.querySelector("#notes").value = "";
   };
