import createUUID from './UUID';

function Project(projectName, identifier) {
  this.projectName = projectName;
  this.identifier = identifier;
}

const addProjectToList = {
  projectList: ['One', 'Two'],
  UUID: function() {
    this.number = createUUID();
    console.log(this.number)
  },
  getValue: function() {
    const UUID = createUUID()
    const projectName = document.querySelector("#projectName").value;
    const addProject = new Project(projectName, UUID);
    this.projectList.push(addProject);
    console.log(this.projectList)
    document.querySelector("#projectName").value = "";
  }
}

export default addProjectToList;