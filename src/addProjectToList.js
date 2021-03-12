// function Project(projectName, identifier) {
//     this.projectName = projectName;
//     this.identifier = identifier;
//   }

function addProjectToList() {
  // const UUID = createUUID()
  const projectName = document.querySelector("#projectName").value;
  // const addProject = new Project(projectName, UUID);
  alert(projectName)
  // projectList.push(addProject);
  // renderProject();
  document.querySelector("#projectName").value = "";
};


// add a return separate function for ProjectList using elements in this module
// export default createProjectList?

function createProjectList() {
    let ProjectList=[]
};


export default addProjectToList;