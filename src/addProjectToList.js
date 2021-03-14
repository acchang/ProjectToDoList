import createUUID from './UUID';
import renderProject from './renderProject'

//import renderProject code

function Project(projectName, identifier) {
  this.projectName = projectName;
  this.identifier = identifier;
}

const addProjectToList = {
  projectList: [],
  UUID: function() {
    this.number = createUUID();
    console.log(this.number)
  },
  getValue: function() {
    const UUID = createUUID();
    const projectName = document.querySelector("#projectName").value;
    const addProject = new Project(projectName, UUID);
    this.projectList.push(addProject);
    // then renderProject? test it by rendering just one line in the projects space
    // can I just insert code as is since the variables apply?
    renderProject();
    console.log("addproject: " + this.projectList);
    document.querySelector("#projectName").value = "";
  }
}

export default addProjectToList;


