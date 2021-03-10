function Project(projectName, identifier) {
    this.projectName = projectName;
    this.identifier = identifier;
  }
  
function addProjectToList() {
const UUID = createUUID()
const projectName = document.querySelector("#projectName").value;
const addProject = new Project(projectName, UUID);
globalVar.projectList.push(addProject);
// projectList.push(addProject);
renderProject();
document.querySelector("#projectName").value = "";
};

export default addProjectToList;