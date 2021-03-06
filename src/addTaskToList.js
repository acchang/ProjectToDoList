import { nanoid } from 'nanoid';

let today = new Date().toISOString().slice(0,10)
let plusFourDays = new Date(Date.now() + (4 * 3600 * 1000 * 24)).toISOString().slice(0,10)

function Task(taskName, taskID, taskPriority, taskDue, taskNotes, taskProjectID) {
    this.taskName = taskName;
    this.taskID = taskID;
    this.taskPriority = taskPriority;
    this.taskDue = taskDue;
    this.taskNotes = taskNotes;
    this.taskProjectID = taskProjectID;
  }

const addTaskToList = {
    taskList: [
            {
                "taskName": "Join a different union",
                "taskID": "Ebl6XLPlKnl3zG07lMj14",
                "taskPriority": "Low",
                "taskDue": "2022-01-01",
                "taskNotes": "Maybe electricians after dockworkers",
                "taskProjectID": "b8d991cd-839c-4138-8b87-164caa3dbddf"
            },
            {
                "taskName": "Pick up Gina at the diner",
                "taskID": "lrT9coUi2ji5f1-bzdPHB",
                "taskPriority": "Medium",
                "taskDue": "2022-01-02",
                "taskNotes": "Sing her a song since flowers too expensive!",
                "taskProjectID": "b8d991cd-839c-4138-8b87-164caa3dbddf"
            },
            {
                "taskName": "Pay back pawn shop for guitar",
                "taskID": "C1mjjETF1giwRVClMWo6Z",
                "taskPriority": "High",
                "taskDue": "2022-01-03",
                "taskNotes": "",
                "taskProjectID": "b8d991cd-839c-4138-8b87-164caa3dbddf"
            },
            {
                "taskName": "Try a new deodorant",
                "taskID": "mxGxxqXrplLs1iFF2624-",
                "taskPriority": "Low",
                "taskDue": "2021-12-23",
                "taskNotes": "Someone says I smell",
                "taskProjectID": "2e9a220e-e8fd-4784-841f-b01d4fb7ed9c"
            },
            {
                "taskName": "Get Robin a frying pan",
                "taskID": "Def7UCU43cDqUpoIaRH42",
                "taskPriority": "Medium",
                "taskDue": "2021-12-24",
                "taskNotes": "",
                "taskProjectID": "2e9a220e-e8fd-4784-841f-b01d4fb7ed9c"
            },
            {
                "taskName": "Repair my car",
                "taskID": "0UJ7thsq4P5Fs65wkZesX",
                "taskPriority": "High",
                "taskDue": "2021-12-25",
                "taskNotes": "Then go after that dastardly Joker!",
                "taskProjectID": "2e9a220e-e8fd-4784-841f-b01d4fb7ed9c"
            },
            {
                "taskName": "VO2 Max test",
                "taskID": "aFdBEuS4q3ECvKAcYtoHm",
                "taskPriority": "Low",
                "taskDue": "2022-03-07",
                "taskNotes": "Sleep early the night before",
                "taskProjectID": "f8c1426c-2e1b-470d-9466-a95d964f5d07"
            },
            {
                "taskName": "Weigh In",
                "taskID": "sbY0fgcGRyjQq3hIx0CVu",
                "taskPriority": "Medium",
                "taskDue": "2022-03-08",
                "taskNotes": "Target: 5% body fat",
                "taskProjectID": "f8c1426c-2e1b-470d-9466-a95d964f5d07"
            },
            {
                "taskName": "Win tournament",
                "taskID": "zlU0YMeCas6s1yRdxeXid",
                "taskPriority": "High",
                "taskDue": "2022-03-09",
                "taskNotes": "Who's number 1?",
                "taskProjectID": "f8c1426c-2e1b-470d-9466-a95d964f5d07"
            },
            {
                "taskName": "Drink 8 glasses of water a day",
                "taskID": "zlU0YMeCas6s1yRdxeXie",
                "taskPriority": "Done",
                "taskDue": today,
                "taskNotes": "",
                "taskProjectID": "f8c1426c-2e1b-470d-9466-a95d964f5d07"
            },
            {
                "taskName": "Weekly yoga",
                "taskID": "zlU0YMeCas6s1yRdxeXif",
                "taskPriority": "Medium",
                "taskDue": plusFourDays,
                "taskNotes": "",
                "taskProjectID": "f8c1426c-2e1b-470d-9466-a95d964f5d07"
            }
    ],

    
    getValue: function() {
        const taskName = document.querySelector("#taskInputField").value;
        const taskID = nanoid();
        const taskPriority = document.querySelector("#taskPrioritySelector").value;
        const taskDue = document.querySelector("#taskCalendarSelector").value;
        const taskNotes = document.querySelector("#taskNotesBox").value;
        const taskProjectID = document.querySelector("#taskProjectSelector").value;
        const addTask = new Task(taskName, taskID, taskPriority, taskDue, taskNotes, taskProjectID);
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
        console.log("addTaskToList.getValue: " + this.taskList)
        },

    deleteObject: function(taskID) {
        this.taskList = this.taskList.filter(object => object.taskID !== taskID);
        },

    changeTaskName: function(taskID, newTaskNameText) {
        const index = this.taskList.findIndex((el) => el.taskID === taskID);
        this.taskList[index].taskName = newTaskNameText;
        },

    changeTaskPriority: function(taskID, newValue) {
        const index = this.taskList.findIndex((el) => el.taskID === taskID);
        this.taskList[index].taskPriority = newValue;
        },
    
    changeTaskDate: function (taskID, newValue) {
        const index = this.taskList.findIndex((el) => el.taskID === taskID);
        this.taskList[index].taskDue = newValue;
        },

    changeTaskNotes: function (taskID, newValue) {
        const index = this.taskList.findIndex((el) => el.taskID === taskID);
        this.taskList[index].taskNotes = newValue;
        },

    changeTaskProject: function (taskID, newValue) {
        const index = this.taskList.findIndex((el) => el.taskID === taskID);
        this.taskList[index].taskProjectID = newValue;
        },

    deleteAllInProject: function(axedTaskProjectID) {
        this.taskList = this.taskList.filter(object => object.taskProjectID !== axedTaskProjectID);
        console.log(this.taskList)
        },
    
    sortbyProject: function(focusOnProjectID) {
        let newProjectTaskList = this.taskList.filter(object => object.taskProjectID == focusOnProjectID);
        console.log(newProjectTaskList);
        return newProjectTaskList;
        },

    createTaskPrefill: function() {
        console.log("this is just to execute something in addTaskToList.createTaskPrefill")
        },

    sortByTime: function(array) {
        function sorter(a,b){
            let diff = new Date(b.taskDue) - new Date(a.taskDue);
            return diff
        }
        let timeSortedArray = array.slice().sort(sorter)
        return timeSortedArray
        },

    sortByToday: function(array) {
        let todayTaskArray = array.filter(object => object.taskDue == today);
        return todayTaskArray;
    },

    sortByThisWeek: function(array) {
        function Epoch(date) {
            return Math.round(new Date(date).getTime());
        }

        let oneWeek = (Date.now() + (7 * 3600 * 1000 * 24))

        let weekTaskArray = array.filter(object => 
            (   Epoch(object.taskDue) < oneWeek &&
                Epoch(object.taskDue) > Date.now())
                ||
                object.taskDue == today 
            )

        return weekTaskArray
    },

   };

  export default addTaskToList;