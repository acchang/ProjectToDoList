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

// THIS IS WHERE THE TASK PARTS BEGIN

function getProjectIdentifier() {
  let taskProjectTitleSpace = document.getElementById('projectHeadline');
  let taskProjectTitle = taskProjectTitleSpace.textContent;
  const projectIndex = projectList.findIndex((el) => el.projectName === taskProjectTitle);
  taskProjectIdentifier = projectList[projectIndex].identifier;
  return(taskProjectIdentifier)
};

function createTaskInput() {
  let taskOverallContainer = document.createElement("div");
  taskOverallContainer.setAttribute("class", "taskOverallContainer");
  taskOverallContainer.setAttribute("id", "taskOverallContainer");
  document.getElementById('taskProjectHolder').appendChild(taskOverallContainer);

  let taskInputContainer = document.createElement("div");
  taskInputContainer.setAttribute("class", "taskInputContainer");
  taskInputContainer.setAttribute("id", "taskInputContainer");
  document.getElementById('taskOverallContainer').appendChild(taskInputContainer);
  createTaskPriorityField();
  createTaskField();
  createTaskCalendarField();
  createTaskNotesField();
  createTaskProjectField();
  createAddTaskField();
};

createTaskInput()
let taskBtn = document.getElementById("taskBtn");
taskBtn.addEventListener("click", function(event){ 
  taskOverallContainer.classList.toggle("flex");
});


function createTaskField() {
  let taskInputFieldHolder = document.createElement("span");
  taskInputFieldHolder.setAttribute("id", "taskInputFieldHolder");
  document.getElementById('taskInputContainer').appendChild(taskInputFieldHolder);

  let taskInputField = document.createElement("input");
  taskInputField.setAttribute("id", "taskInputField");
  taskInputField.setAttribute("type", "text");
  taskInputField.setAttribute("maxlength", "60");
  taskInputField.setAttribute("size", "60");
  taskInputField.setAttribute("placeholder", "Add task name here");
  taskInputField.classList.add("task-input");
  document.getElementById('taskInputFieldHolder').appendChild(taskInputField);
};

function createTaskPriorityField() {
  let taskPrioritySection = document.createElement("span");
  taskPrioritySection.setAttribute("id", "taskPrioritySection");
  taskPrioritySection.setAttribute("Class", "taskPrioritySection");
  document.getElementById('taskInputContainer').appendChild(taskPrioritySection);

  let taskPriorityButton = document.createElement("button");
  taskPriorityButton.setAttribute("id", "taskPriorityButton");
  taskPriorityButton.innerText = "Priority ";
  document.getElementById('taskPrioritySection').appendChild(taskPriorityButton);

  let taskPriorityIcon = document.createElement("span") 
  taskPriorityIcon.setAttribute("class", "glyphicon glyphicon-sort");
  document.getElementById("taskPriorityButton").appendChild(taskPriorityIcon);

  taskPriorityButton.addEventListener("click", function(event){ 
  taskPrioritySelector.classList.toggle("flex")
  });

  let taskPrioritySelector = document.createElement("select");
  taskPrioritySelector.setAttribute("class", "taskPrioritySelector");
  taskPrioritySelector.setAttribute("id", "taskPrioritySelector");
  document.getElementById('taskPrioritySection').appendChild(taskPrioritySelector);
  
  let taskPriorityOne = document.createElement("option");
  taskPriorityOne.setAttribute("value", "High");
  taskPriorityOne.innerText = "High";
  document.getElementById("taskPrioritySelector").appendChild(taskPriorityOne);

  let taskPriorityTwo = document.createElement("option");
  taskPriorityTwo.setAttribute("value", "Medium");
  taskPriorityTwo.innerText = "Medium";
  document.getElementById("taskPrioritySelector").appendChild(taskPriorityTwo);

  let taskPriorityThree = document.createElement("option");
  taskPriorityThree.setAttribute("value", "Low");
  taskPriorityThree.innerText = "Low";
  document.getElementById("taskPrioritySelector").appendChild(taskPriorityThree);

  let taskPriorityFour = document.createElement("option");
  taskPriorityFour.setAttribute("value", "Done");
  taskPriorityFour.innerText = "Done";
  document.getElementById("taskPrioritySelector").appendChild(taskPriorityFour);
};

function createTaskCalendarField() {
  let taskCalendarField = document.createElement("span");
  taskCalendarField.setAttribute("id", "taskCalendarField");
  taskCalendarField.textContent = "Due: "
  document.getElementById('taskInputContainer').appendChild(taskCalendarField);

  let taskCalendarSelector = document.createElement("input");
  taskCalendarSelector.setAttribute("id", "taskCalendarSelector");
  taskCalendarSelector.setAttribute("type", "date");
  document.getElementById('taskCalendarField').appendChild(taskCalendarSelector);
}

function createTaskNotesField() {
  let taskNotesField = document.createElement("span");
  taskNotesField.setAttribute("id", "taskNotesField");
  taskNotesField.setAttribute("Class", "taskNotesField");
  document.getElementById('taskInputContainer').appendChild(taskNotesField);

    let taskNotesButton = document.createElement("button");
    taskNotesButton.setAttribute("id", "taskNotesButton");
    taskNotesButton.innerText = "Notes: ";
    document.getElementById('taskNotesField').appendChild(taskNotesButton);

      let taskNotesIcon = document.createElement("span") 
      taskNotesIcon.setAttribute("class", "glyphicon glyphicon-edit");
      document.getElementById("taskNotesButton").appendChild(taskNotesIcon);

  let taskNotesInput = document.createElement("div");
  taskNotesInput.setAttribute("class", "taskNotesInput");
  taskNotesInput.setAttribute("id", "taskNotesInput");
  document.getElementById('taskOverallContainer').appendChild(taskNotesInput);
  taskNotesInput.innerText = "Additional info: ";

  let taskNotesBox = document.createElement("textarea");
  taskNotesBox.setAttribute("id", "taskNotesBox");
  taskNotesBox.setAttribute("placeholder", "Add notes here");
  document.getElementById('taskNotesInput').appendChild(taskNotesBox);

  taskNotesButton.addEventListener("click", function(event){ 
  taskNotesInput.classList.toggle("flex")
  })
};

function createTaskProjectField() {
  let taskProjectSection = document.createElement("span");
  taskProjectSection.setAttribute("id", "taskProjectSection");
  taskProjectSection.setAttribute("Class", "taskProjectSection");
  document.getElementById('taskInputContainer').appendChild(taskProjectSection);

  let taskProjectButton = document.createElement("button");
  taskProjectButton.setAttribute("id", "taskProjectButton");
  taskProjectButton.innerText = "Project ";
  document.getElementById('taskProjectSection').appendChild(taskProjectButton);

  let taskProjectIcon = document.createElement("span") 
  taskProjectIcon.setAttribute("class", "glyphicon glyphicon-folder-open");
  document.getElementById("taskProjectButton").appendChild(taskProjectIcon);

  let taskProjectSelector = document.createElement("select");
  taskProjectSelector.setAttribute("id", "taskProjectSelector");
  taskProjectSelector.setAttribute("class", "taskProjectSelector");
  document.getElementById('taskProjectSection').appendChild(taskProjectSelector);

  taskProjectButton.addEventListener("click", function(event){ 
  taskProjectSelector.classList.toggle("flex");

  removeOptions(taskProjectSelector);
  let taskProjectCurrentID = getProjectIdentifier();
  let taskProjectCurrentTitle = projectList.find(x => x.identifier === taskProjectCurrentID).projectName;
  console.log(taskProjectCurrentTitle);

  let taskProjectTitle = document.createElement("option");
  taskProjectTitle.setAttribute("id", taskProjectCurrentID);
  taskProjectTitle.setAttribute("value", taskProjectCurrentID);
  taskProjectTitle.innerText = taskProjectCurrentTitle;
  document.getElementById("taskProjectSelector").appendChild(taskProjectTitle);

  for (i = 0; i < projectList.length; i++) {
    let taskProjectOption = document.createElement("option");
    taskProjectOption.setAttribute("id", projectList[i].identifier);
    taskProjectOption.setAttribute("value", projectList[i].identifier);
    taskProjectOption.innerText = projectList[i].projectName;
    document.getElementById("taskProjectSelector").appendChild(taskProjectOption)};
  });   
}

  // remove it from the options too
  // function getProjectIdentifier() {
  //   let taskProjectTitleSpace = document.getElementById('projectHeadline');
  //   let taskProjectTitle = taskProjectTitleSpace.textContent;
  //   const projectIndex = projectList.findIndex((el) => el.projectName === taskProjectTitle);
  //   taskProjectIdentifier = projectList[projectIndex].identifier;
  //   return(taskProjectIdentifier)
  // };  
  // maybe for that last remove the first with remove()






function removeOptions(selectElement) {
  var i, L = selectElement.options.length - 1;
  for(i = L; i >= 0; i--) {
     selectElement.remove(i);
  }
}

function createAddTaskField() {
  let addTaskField = document.createElement("span");
  addTaskField.setAttribute("id", "addTaskField");
  document.getElementById('taskInputContainer').appendChild(addTaskField);

  let addTaskButton = document.createElement("button");
  addTaskButton.setAttribute("id", "addTaskButton");
  addTaskButton.innerText = "Add ";
  document.getElementById('addTaskField').appendChild(addTaskButton);

  let addTaskIcon = document.createElement("span") 
  addTaskIcon.setAttribute("class", "glyphicon glyphicon-plus-sign");
  document.getElementById("addTaskButton").appendChild(addTaskIcon);

  addTaskButton.addEventListener("click", function(event){
    addTaskToList()
  })
};


function Task(taskName, taskPriority, taskDue, taskNotes, taskProject) {
  this.taskName = taskName;
  this.taskPriority = taskPriority;
  this.taskDue = taskDue;
  this.taskNotes = taskNotes;
  this.taskProject = taskProject;
}

function addTaskToList() {
  let taskName = document.querySelector("#taskInputField").value;
  let taskPriority = document.querySelector("#taskPrioritySelector").value;
  let taskDue = document.querySelector("#taskCalendarSelector").value;
  let taskNotes = document.querySelector("#taskNotesBox").value;
  let taskProject = document.querySelector("#taskProjectSelector").value;
  var addTask = new Task(taskName, taskPriority, taskDue, taskNotes, taskProject);
  taskList.push(addTask);
  document.querySelector("#taskInputField").value = "";
  document.querySelector("#taskPrioritySelector").value = "";
  taskPrioritySelector.classList.toggle("flex");
  document.querySelector("#taskCalendarSelector").value = "";
  document.querySelector("#taskNotesBox").value = "";
  taskNotesInput.classList.toggle("none");
  document.querySelector("#taskProjectSelector").value;
  taskProjectSelector.classList.toggle("flex");
  console.log(taskList)
 };



// create task UUID for each when adding to list with nanoID; may need webpack
// read the nanoid documentation to see if they had a CLI

// render tasks (will need UUID), add delete/trash option, cross out done
// first all, then sort by project, sort by date