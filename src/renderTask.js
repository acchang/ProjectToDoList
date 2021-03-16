import addTaskToList from './addTaskToList';
import addProjectToList from './addProjectToList';

function renderTask(taskArray) {
  let taskHolder = document.getElementById("taskHolder");
  taskHolder.innerHTML = '';

    let i;
    for (i = 0; i < taskArray.length; i++) {    
      let taskContainer = document.createElement("div");
      taskContainer.setAttribute("id", "TC" + taskArray[i].taskID);
      document.getElementById("taskHolder").appendChild(taskContainer);
      addTaskPriority(i,taskArray)
      addTaskName(i, taskArray);
      editTaskName(i,taskArray)
      addTaskDue(i, taskArray);
      addTaskTrashIcon(i,taskArray);
      addTaskEditNotes(i,taskArray);
      console.log(taskArray)
    }
};

// Priority - Name - Due - Edit/notes - Delete

function addTaskPriority(i,taskArray) {
    // do this like the project, it's pre-selected
    // pre-selected, then change attributes of askTaskName
    // change this on the fly so you can either color code or X out.
    // high is red and bold, medium black, muted low, done strikethrough.
    let taskPriority = document.createElement("span");
    taskPriority.setAttribute("id", "TP" + taskArray[i].taskID);
    taskPriority.innerText = taskArray[i].taskPriority;
    document.getElementById("TC" + taskArray[i].taskID).appendChild(taskPriority);
};

function addTaskName(i,taskArray) {
    let taskName = document.createElement("span");
    taskName.setAttribute("id", "TN" + taskArray[i].taskID);
    taskName.setAttribute("contentEditable", true);
    taskName.innerText = taskArray[i].taskName;
    document.getElementById("TC" + taskArray[i].taskID).appendChild(taskName);
};

function editTaskName(i,taskArray) {
    let newTaskName = document.getElementById("TN" + taskArray[i].taskID);

    newTaskName.addEventListener('input', function() { 
    const newTaskNameText = newTaskName.textContent;
    addTaskToList.changeTaskName(taskArray[i].taskID, newTaskNameText)
    })    

    newTaskName.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
      });
  };


function addTaskDue(i,taskArray) {
    let taskDue = document.createElement("span");
    taskDue.setAttribute("id", "TD" + taskArray[i].taskID);
    taskDue.innerText = taskArray[i].taskDue;
    document.getElementById("TC" + taskArray[i].taskID).appendChild(taskDue);
};

function addTaskEditNotes(i,taskArray) {
    let taskEditNotesButton = document.createElement("button") 
    taskEditNotesButton.setAttribute("class", "projectTrashButton icon-button right")
    taskEditNotesButton.setAttribute("id", "TE" + taskArray[i].taskID)
    document.getElementById("TC" + taskArray[i].taskID).appendChild(taskEditNotesButton);
  
    let taskEditIcon = document.createElement("span") 
    taskEditIcon.setAttribute("class", "glyphicon glyphicon-edit")
    document.getElementById("TE" + taskArray[i].taskID).appendChild(taskEditIcon);
  
    taskEditNotesButton.addEventListener("click", function(event) {
        alert("edit open window")
        // adds window underneath showing editable notes, eventListener like editTaskName
        // dropdown to reassign project
        // date is editable too
        // updates addTasktoList
    })
}

function addTaskTrashIcon(i,taskArray) {
    let taskTrashButton = document.createElement("button") 
    taskTrashButton.setAttribute("class", "projectTrashButton icon-button right")
    taskTrashButton.setAttribute("id", "TB" + taskArray[i].taskID)
    document.getElementById("TC" + taskArray[i].taskID).appendChild(taskTrashButton);
  
    let taskTrashIcon = document.createElement("span") 
    taskTrashIcon.setAttribute("class", "glyphicon glyphicon-trash")
    document.getElementById("TB" + taskArray[i].taskID).appendChild(taskTrashIcon);
  
    taskTrashButton.addEventListener("click", function(event) {
      const deleteDivTarget = document.getElementById("TC" + taskArray[i].taskID);
      taskHolder.removeChild(deleteDivTarget);
      addTaskToList.deleteObject(addTaskToList.taskList[i].taskID)
    })
}

export default renderTask;