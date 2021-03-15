import { nanoid } from 'nanoid';


function Task(taskName, taskID, taskPriority, taskDue, taskNotes, taskProject) {
    this.taskName = taskName;
    this.taskID = taskID;
    this.taskPriority = taskPriority;
    this.taskDue = taskDue;
    this.taskNotes = taskNotes;
    this.taskProject = taskProject;
  }

const addTaskToList = {
    taskList: [],
    getValue: function() {
        const taskName = document.querySelector("#taskInputField").value;
        const taskID = nanoid();
        const taskPriority = document.querySelector("#taskPrioritySelector").value;
        const taskDue = document.querySelector("#taskCalendarSelector").value;
        const taskNotes = document.querySelector("#taskNotesBox").value;
        const taskProject = document.querySelector("#taskProjectSelector").value;
        const addTask = new Task(taskName, taskID, taskPriority, taskDue, taskNotes, taskProject);
        this.taskList.push(addTask);
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
        console.log(this.taskList)
    }
   };

  export default addTaskToList;