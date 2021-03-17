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
      editTaskName(i,taskArray);
      addTaskTrashIcon(i,taskArray);
      addTaskEditNotes(i,taskArray);
      addTaskDue(i, taskArray);
      console.log(taskArray)
    }
};

function addTaskPriority(i,taskArray) {
// try refactor https://discord.com/channels/505093832157691914/513125308757442562/821757213361307710

    function changePriorityToMatch() {
        let value = document.getElementById('taskRenderPrioritySelect' + taskArray[i].taskID).value;
        addTaskToList.changeTaskPriority(taskArray[i].taskID, value);
        if(value == "Done") 
        {
          document.getElementById("TN" + taskArray[i].taskID).classList.toggle("done")
        }
        else {document.getElementById("TN" + taskArray[i].taskID).classList.remove("done");}
      }

    let taskRenderPrioritySelect = document.createElement("select");
    taskRenderPrioritySelect.setAttribute("id", "taskRenderPrioritySelect" + taskArray[i].taskID);
    taskRenderPrioritySelect.setAttribute("class", "taskRenderPrioritySelect");
    document.getElementById("TC" + taskArray[i].taskID).appendChild(taskRenderPrioritySelect);

    taskRenderPrioritySelect.addEventListener("change", changePriorityToMatch);
    // selected maybe goes here too?
    let taskPriorityOptionHigh = document.createElement("option");
    taskPriorityOptionHigh.setAttribute("id", "High" + taskArray[i].taskID);
    taskPriorityOptionHigh.setAttribute("value", "High");
    taskPriorityOptionHigh.innerText = "🟥"
    document.getElementById("taskRenderPrioritySelect" + taskArray[i].taskID).appendChild(taskPriorityOptionHigh);

    let taskPriorityOptionMed = document.createElement("option");
    taskPriorityOptionMed.setAttribute("id", "Med"+ taskArray[i].taskID);
    taskPriorityOptionMed.setAttribute("value", "Med");
    taskPriorityOptionMed.innerText = "🔲"
    document.getElementById("taskRenderPrioritySelect" + taskArray[i].taskID).appendChild(taskPriorityOptionMed);

    let taskPriorityOptionLow = document.createElement("option");
    taskPriorityOptionLow.setAttribute("id", "Low"+ taskArray[i].taskID);
    taskPriorityOptionLow.setAttribute("value", "Low");
    taskPriorityOptionLow.innerText = "⬜️"
    document.getElementById("taskRenderPrioritySelect" + taskArray[i].taskID).appendChild(taskPriorityOptionLow);

    let taskPriorityOptionDone = document.createElement("option");
    taskPriorityOptionDone.setAttribute("id", "Done"+ taskArray[i].taskID);
    taskPriorityOptionDone.setAttribute("value", "Done");
    taskPriorityOptionDone.innerText = "𝗫"

    document.getElementById("taskRenderPrioritySelect" + taskArray[i].taskID).appendChild(taskPriorityOptionDone);
    
    const priorityTable = {
        High: "0",
        Medium: "1",
        Low: "2",
        Done: "3",
      };

      let priorityChoice = taskArray[i].taskPriority;
    
    //   if (priorityChoice="") {(console.log(priorityChoice))}

      const priorityMapper = (rating) => priorityTable[rating]; 
      let priorityIndex = priorityMapper(priorityChoice);
      taskRenderPrioritySelect.options[priorityIndex].selected = true;

// why default to high?
// error occurs when there are no options selected, so it can't be translated over. 
// main.js:2 Uncaught TypeError: Cannot set property 'selected' of undefined
// try updating priorityTable so when there's nothing, it selects something.
// if taskArray[i].taskPriority is anything, give it a medium.

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
    taskDue.setAttribute("class", "right");
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

        let taskEditWindow = document.createElement("div") 
        taskEditWindow.setAttribute("id", "EW" + taskArray[i].taskID)
        taskEditWindow.innerText = addTaskToList.taskList[i].taskNotes
        document.getElementById("TC" + taskArray[i].taskID).appendChild(taskEditWindow);

        // adds window underneath showing editable notes, eventListener like editTaskName
        // 3 methods for 3 options -- change notes, change date, dropdown to reassign project
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