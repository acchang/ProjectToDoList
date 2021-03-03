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
  let taskInputContainer = document.createElement("div");
  taskInputContainer.setAttribute("class", "taskInputContainer");
  taskInputContainer.setAttribute("id", "taskInputContainer");
  document.getElementById('taskProjectHolder').appendChild(taskInputContainer);
  createTaskPriorityField();
  createTaskField();
  createTaskCalendarField();
  createTaskNotesField();
  createTaskProjectField();
  createAddTaskField();
}

createTaskInput()
let taskBtn = document.getElementById("taskBtn");
taskBtn.addEventListener("click", function(event){ 
  // taskOverallCreate.classList.toggle("flex")
  taskInputContainer.classList.toggle("flex")
});


function createTaskField() {
  let taskInputFieldHolder = document.createElement("span");
  taskInputFieldHolder.setAttribute("id", "taskInputFieldHolder");
  document.getElementById('taskInputContainer').appendChild(taskInputFieldHolder);

  let taskInputField = document.createElement("input");
  taskInputField.setAttribute("id", "taskInputField");
  taskInputField.setAttribute("type", "text");
  taskInputField.setAttribute("maxlength", "65");
  taskInputField.setAttribute("size", "65");
  taskInputField.setAttribute("placeholder", "Add task name here");
  taskInputField.classList.add("task-input");
  document.getElementById('taskInputFieldHolder').appendChild(taskInputField);
};

function createTaskPriorityField() {
  // let taskPriorityInput = document.createElement("input");
  // taskPriorityInput.setAttribute("type", "text");
  // taskPriorityInput.setAttribute("size", "7");
  // taskPriorityInput.setAttribute("id", "taskPriorityInput");
  // taskPriorityInput.setAttribute("placeholder", "Priority");
  // document.getElementById('taskInputContainer').appendChild(taskPriorityInput);

  let taskPrioritySelector = document.createElement("select");
  taskPrioritySelector.setAttribute("id", "taskPrioritySelector");
  document.getElementById('taskInputContainer').appendChild(taskPrioritySelector);
  
  let taskPriorityTitle = document.createElement("option");
  taskPriorityTitle.setAttribute("id", "taskPriorityTitle");
  taskPriorityTitle.setAttribute("value", "Neutral");
  taskPriorityTitle.innerText = "Priority";
  document.getElementById("taskPrioritySelector").appendChild(taskPriorityTitle);

  // no span in selects, best I can do is button to show selector underneath, ugly
  // let taskPriorityIcon = document.createElement("span") 
  // taskPriorityIcon.setAttribute("class", "glyphicon glyphicon-sort")
  // document.getElementById("taskPriorityTitle").appendChild(taskPriorityIcon);

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

  // what I want from this is select.value
  var select = document.getElementById('taskPrioritySelector');
  var input = document.getElementById('taskPriorityInput');
  select.onchange = function() {
      input.value = select.value;
  }
}


// function createTaskPriorityField() {
//   let taskPriorityDropdown = document.createElement("span");
//   taskPriorityDropdown.setAttribute("id", "taskPriorityDropdown");
//   taskPriorityDropdown.setAttribute("class", "dropdown");
//   document.getElementById('taskInputContainer').appendChild(taskPriorityDropdown);

//   let taskPriorityButton = document.createElement("button");
//   taskPriorityButton.setAttribute("id", "taskPriorityButton");
//   taskPriorityButton.setAttribute("class", "dropbtn");
//   taskPriorityButton.innerText = "priority";
//   taskPriorityButton.addEventListener("click", function(event) {myFunction()});
//   document.getElementById('taskPriorityDropdown').appendChild(taskPriorityButton);

//   let taskPriorityIcon = document.createElement("span") 
//   taskPriorityIcon.setAttribute("class", "glyphicon glyphicon-sort")
//   document.getElementById("taskPriorityButton").appendChild(taskPriorityIcon);

//   // I want these to change to the top field and then be recorded.n

//   let taskPriorityField = document.createElement("div");
//   taskPriorityField.setAttribute("id", "taskPriorityChoices");
//   taskPriorityField.setAttribute("class", "dropdown-content");
//   document.getElementById('taskPriorityDropdown').appendChild(taskPriorityField);

//   let priorityOne = document.createElement("a");
//   priorityOne.setAttribute("href", "http://cnn.com");
//   priorityOne.innerText = "Hi"
//   document.getElementById('taskPriorityChoices').appendChild(priorityOne);

//   let priorityTwo = document.createElement("a");
//   priorityTwo.setAttribute("href", "http://nyt.com");
//   priorityTwo.innerText = "Med"
//   document.getElementById('taskPriorityChoices').appendChild(priorityTwo);

//   let priorityThree = document.createElement("a");
//   priorityThree.setAttribute("href", "http://reddit.com");
//   priorityThree.innerText = "Low"
//   document.getElementById('taskPriorityChoices').appendChild(priorityThree);

//   let priorityFour = document.createElement("a");
//   priorityFour.setAttribute("href", "http://google.com");
//   priorityFour.innerText = "Done"
//   document.getElementById('taskPriorityChoices').appendChild(priorityFour);

//   function myFunction() {
//     document.getElementById("taskPriorityChoices").classList.toggle("show");
//   }

//   window.onclick = function(event) {
//     if (!event.target.matches('.dropbtn')) {
//       let dropdowns = document.getElementsByClassName("dropdown-content");
//       let i;
//       for (i = 0; i < dropdowns.length; i++) {
//         var openDropdown = dropdowns[i];
//         if (openDropdown.classList.contains('show')) {
//           openDropdown.classList.remove('show');
//         }
//       }
//     }
//   }
// };


// on to creating a calendar dropdown and then picking from it
function createTaskCalendarField() {
  let taskCalendarField = document.createElement("span");
  taskCalendarField.setAttribute("id", "taskCalendarField");
  taskCalendarField.textContent = "Due: "
  document.getElementById('taskInputContainer').appendChild(taskCalendarField);

  let taskCalendarSelector = document.createElement("input");
  taskCalendarSelector.setAttribute("id", "taskCalendarSelector");
  taskCalendarSelector.setAttribute("type", "date");
  document.getElementById('taskCalendarField').appendChild(taskCalendarSelector);

  // let taskCalendarButton = document.createElement("button");
  // taskCalendarButton.setAttribute("id", "taskCalendarButton");
  // taskCalendarButton.innerText = "due date ";
  // document.getElementById('taskCalendarField').appendChild(taskCalendarButton);

  // let taskCalendarIcon = document.createElement("span") 
  // taskCalendarIcon.setAttribute("class", "glyphicon glyphicon-calendar");
  // document.getElementById("taskCalendarField").appendChild(taskCalendarIcon);

  // <form action="/action_page.php">
  // <label for="birthday">Birthday:</label>
  // <input type="date" id="birthday" name="birthday">
  // <input type="submit">
  // </form>
}

// notes hide and show, linebreak then new input field.
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

  let taskNotesInput = document.createElement("div");
  taskNotesInput.setAttribute("id", "taskNotesInput");
  taskNotesInput.setAttribute("input", "text");
  document.getElementById('taskProjectHolder').appendChild(taskNotesInput);
  taskNotesInput.innerText = "Notes: ";

  let taskNotesBox = document.createElement("input");
  taskNotesBox.setAttribute("id", "taskNotesBox");
  taskNotesBox.setAttribute("type", "textarea");
  taskNotesBox.setAttribute("rows", "4");
  taskNotesBox.setAttribute("cols", "50");
  taskNotesBox.setAttribute("placeholder", "Add notes here");
  document.getElementById('taskNotesInput').appendChild(taskNotesBox);

  taskNotesButton.addEventListener("click", function(event){ 
  taskNotesInput.classList.toggle("show")
  })
};





// project with default, option to change?
// goes hidden after entering
// no way to add new project if in a project
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
// addtaskbutton should push all tasks to task list with selected project.  
// openProjects would take all tasks matching that UUID and display them.
// sorting will also teach me when I need to render for today and this week
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


  // when I render I will have to filter by project, sort by date