let projectList = []

function Project(projectName, identifier) {
  this.projectName = projectName;
  this.identifier = identifier;
}

// learn how to do this by checkbox so you can just change styles instead of hardcoding
// no icon, add the checkbox ahead of the project
// maybe an icon to rewrite the project name once in



function showAddProject() {
  let x = document.getElementById("projectSubmitForm");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}

const projectSubmitButton = document.querySelector(".projectSubmitButton")
projectSubmitButton.addEventListener("click", e => {
     e.preventDefault();
     addProjectToList();
     });

const projectCloseButton = document.querySelector(".projectCloseButton")
projectCloseButton.addEventListener("click", e => {
    e.preventDefault();
    showAddProject();
    document.querySelector("#projectName").value = "";
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

  const projectContainer = document.createElement("div");
  projectContainer.classList.add("project-container");
  projectContainer.setAttribute("id", "C" + projectUUID)
  
  projectContainer.textContent = projectList[projectList.length-1].projectName
  document.getElementById('projectHolder').appendChild(projectContainer);

  const projectTrashButton = document.createElement("button") 
  projectTrashButton.setAttribute("class", "projectTrashButton icon-button")
  projectTrashButton.setAttribute("id", "TB" + projectUUID)

  const projectDoneButton = document.createElement("button") 
  projectDoneButton.setAttribute("class", "projectDoneButton icon-button")
  projectDoneButton.setAttribute("id", "DB" + projectUUID)

  document.getElementById("C" + projectUUID).appendChild(projectDoneButton);
  document.getElementById("C" + projectUUID).appendChild(projectTrashButton);

  const projectDoneIcon = document.createElement("span") 
  projectDoneIcon.setAttribute("class", "glyphicon glyphicon-ok")
  document.getElementById("DB" + projectUUID).appendChild(projectDoneIcon);

  const projectTrashIcon = document.createElement("span") 
  projectTrashIcon.setAttribute("class", "glyphicon glyphicon-trash")
  document.getElementById("TB" + projectUUID).appendChild(projectTrashIcon);

  projectTrashButton.addEventListener("click", function(event)
    {const deleteDivTarget = document.getElementById("C" + projectUUID);
     projectHolder.removeChild(deleteDivTarget);
     projectList = projectList.filter(object => object.identifier !== projectUUID);
  })

  projectDoneButton.addEventListener("click", function(event)
    {const doneDivTarget = document.getElementById("C" + projectUUID);
    if (doneDivTarget.style.textDecoration === "line-through") {
      doneDivTarget.style.textDecoration="none"
    } else {
      doneDivTarget.style.textDecoration = "line-through";
    }
  })
}

// make each project clickable
// put projectList[projectList.length-1].projectName in taskListcontainer with name at top
// button to add task
// task goes into taskList which needs to be associated with project

// let taskList = []

// function Task(taskName, dueDate, priority, done, trashTask, notes) {
// // expand to add done, comment and delete
//     this.taskName = taskName;
//     this.dueDate = dueDate;
//     this.dueDatedueDate = priority;
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
