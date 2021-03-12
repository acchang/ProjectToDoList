
import addProjectToList from './addProjectToList';

function createProjectListeners() {
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

    let projectSubmitForm = document.querySelector(".projectSubmitForm");
        let Projects = document.getElementById("Projects")
        Projects.querySelector("input[id=projectForm]").addEventListener("click", (event)=>{
        projectSubmitForm.classList.toggle("show")
        });
    };

    export default createProjectListeners;