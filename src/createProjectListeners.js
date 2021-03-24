import addProjectToList from './addProjectToList';
import addTaskToList from './addTaskToList';
import renderTask from './renderTask';

function createProjectListeners() {
    const projectSubmitForm = document.querySelector(".projectSubmitForm");
    const Projects = document.getElementById("Projects")
    Projects.querySelector("input[id=projectForm]").addEventListener("click", (event)=>{
    projectSubmitForm.classList.toggle("show")
    });

    const projectSubmitButton = document.querySelector(".projectSubmitButton")
    projectSubmitButton.addEventListener("click", e => {
        e.preventDefault();
        addProjectToList.getValue();
        // this may also be where render gets executed or in addProjectToList
        });

    const projectCloseButton = document.querySelector(".projectCloseButton")
    projectCloseButton.addEventListener("click", e => {
        e.preventDefault();
        projectSubmitForm.classList.toggle("show")
        });

    const homeHeading = document.getElementById("Home")
    homeHeading.addEventListener("click", function(){
        clearHeadlineField()
        let taskProjectPrefix = document.createTextNode('Home');
        document.getElementById('projectPrefix').appendChild(taskProjectPrefix); 
        
        let sortedArray = addTaskToList.sortByTime(addTaskToList.taskList);
        renderTask(sortedArray);
 
        });
    
    const todayHeading = document.getElementById("Today")
    todayHeading.addEventListener("click", function(){
        clearHeadlineField();
        let taskProjectPrefix = document.createTextNode('Today');
        document.getElementById('projectPrefix').appendChild(taskProjectPrefix); 
        renderTask(addTaskToList.sortByToday(addTaskToList.taskList));
        });

    const thisWeekHeading = document.getElementById("ThisWeek")
    thisWeekHeading.addEventListener("click", function(){
        clearHeadlineField();
        let taskProjectPrefix = document.createTextNode('This Week');
        document.getElementById('projectPrefix').appendChild(taskProjectPrefix); 
        console.log("one week" + (Date.now() + (7 * 3600 * 1000 * 24)))
        console.log(addTaskToList.sortByThisWeek(addTaskToList.taskList));
        renderTask(addTaskToList.sortByThisWeek(addTaskToList.taskList));

        // filter for today minus 7
        // renderTask(addTaskToList.sortByWeek(addTaskToList.taskList));
        // alert("ThisWeek");

        // let nowEpoch = Date.now();
        // let now = new Date();
        // alert("nowEpoch: " + nowEpoch + " getTime " + now.getTime());

        // take taskDue and convert via .getTime()


        // let plusWeek = now.setDate(now.getDate() - 7); // add -7 days to your date variable 
        // alert(plusWeek);

        });

    };

function clearHeadlineField() {
    let projectPrefixSpan = document.getElementById('projectPrefix');
    let projectHeadlineSpan = document.getElementById('projectHeadline');  
    projectPrefixSpan.innerHTML = '';
    projectHeadlineSpan.innerHTML = '';
    let taskProjectHolder = document.getElementById('taskProjectHolder');
    taskProjectHolder.innerHTML = '';
    }


export default createProjectListeners;