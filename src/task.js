function getProjectIdentifier() {
    let taskProjectTitleSpace = document.getElementById('projectHeadline');
    let taskProjectTitle = taskProjectTitleSpace.textContent;
    const projectIndex = projectList.findIndex((el) => el.projectName === taskProjectTitle);
    taskProjectIdentifier = projectList[projectIndex].identifier;
    return(taskProjectIdentifier)
  };
  
  createTaskInput()
  let taskBtn = document.getElementById("taskBtn");
  taskBtn.addEventListener("click", function(event){ 
    taskOverallContainer.classList.toggle("flex");
  });
  
  // I need to generate a UUID with nanoID

  let taskList = [];

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
      if(taskPrioritySelector.classList.contains('flex')) {
        taskPrioritySelector.classList.toggle('flex');
        } 
    document.querySelector("#taskCalendarSelector").value = "";
    document.querySelector("#taskNotesBox").value = "";
      if(taskNotesInput.classList.contains('flex')) {
        taskNotesInput.classList.toggle("flex");
        } 
    document.querySelector("#taskProjectSelector").value = "";
      if(taskProjectSelector.classList.contains('flex')) {
        taskProjectSelector.classList.toggle("flex");
        } 
    console.log(taskList)
   };
  
