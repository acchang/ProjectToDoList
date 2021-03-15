import createUUID from './UUID';
import renderProject from './renderProject'

function Project(projectName, identifier) {
  this.projectName = projectName;
  this.identifier = identifier;
}

const addProjectToList = {
  projectList: [],
  getValue: function() {
    const UUID = createUUID();
    const projectName = document.querySelector("#projectName").value;
    const addProject = new Project(projectName, UUID);
    this.projectList.push(addProject);
    renderProject();
    document.querySelector("#projectName").value = "";
  },
  deleteObject: function(UUID) {
    this.projectList = this.projectList.filter(object => object.identifier !== UUID);
    },
  changeProjectName: function(projectUUID, newProjectContainerText) {
    const index = this.projectList.findIndex((el) => el.identifier === projectUUID);
    this.projectList[index].projectName = newProjectContainerText;
    console.log(this.projectList)
    }
}

export default addProjectToList;


