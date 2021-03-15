import addProjectToList from './addProjectToList';
// import createTaskListener from './createTaskListener';

function renderProject() {
  const projectList = addProjectToList.projectList
  const projectUUID = addProjectToList.projectList[addProjectToList.projectList.length-1].identifier;
  const projectName = addProjectToList.projectList[addProjectToList.projectList.length-1].projectName;
  console.log(projectList)
  console.log(projectName)
  console.log(projectUUID)

  let projectContainer = document.createElement("div");
  projectContainer.classList.add("project-container");
  projectContainer.setAttribute("id", "C" + projectUUID);
 
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

function activateProjectCheckbox(projectUUID, projectContainerTextHolder) {
    let thisProjectContainer = document.getElementById("C" + projectUUID)
    thisProjectContainer.querySelector("input[type=checkbox]").addEventListener("click", (event)=>{
    projectContainerTextHolder.classList.toggle("done")
    })
};

function editProjectText(projectUUID, projectName) {
    let newProjectContainerTextHolder = document.getElementById("TH" + projectUUID);
    newProjectContainerTextHolder.addEventListener('input', function() {  
    const newProjectContainerText = newProjectContainerTextHolder.textContent;
    addProjectToList.changeProjectName(projectUUID, newProjectContainerText)
    })
// it would be nice to dynamically change the task list heading too if currently showing
    
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
      addProjectToList.deleteObject(projectUUID);
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

/// this one is onworking, how to populate, works with OpenButton Glyphicon

function openProject(projectUUID) {
    let projectPrefixSpan = document.getElementById('projectPrefix');
    let projectHeadlineSpan = document.getElementById('projectHeadline');
  
    let taskProjectHolder = document.getElementById('taskProjectHolder');
    taskProjectHolder.innerText = '';
  
    projectPrefixSpan.innerHTML = '';
    projectHeadlineSpan.innerHTML = '';

   const projectIndex = addProjectToList.projectList.findIndex((el) => el.identifier === projectUUID);
   let taskProjectPrefix = document.createTextNode('Project: ');
   let taskProjectHead = document.createTextNode(addProjectToList.projectList[projectIndex].projectName);

    document.getElementById('projectPrefix').appendChild(taskProjectPrefix); 
    document.getElementById('projectHeadline').appendChild(taskProjectHead); 

    // why does createTask button expose 'taskOverallContainer.classList.toggle("flex");'
  // when newProjectHeadline is appended?
    // says taskOverallContainer is not defined

    // render/populate the TaskHolder with the TaskList that corresponds with the projectUUID
    // createTaskInput()

  }

export default renderProject;
