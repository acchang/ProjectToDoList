let projectList = []

function Project(projectName, identifier) {
  this.projectName = projectName;
  this.identifier = identifier;
}

function showAddProject() {
  var x = document.getElementById("projectSubmitForm");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

const projectSubmitButton = document.querySelector(".projectSubmitButton")
projectSubmitButton.addEventListener("click", e => {
     e.preventDefault();
     addProjectToList();
     });

const projectCloseButton = document.querySelector(".projectCloseButton")
projectCloseButton.addEventListener("click", e => {
    e.preventDefault();
    showAddProject();
    document.querySelector("#projectName").value = "";
    });

function addProjectToList() {
var UUID = createUUID()
let projectName = document.querySelector("#projectName").value;
var addProject = new Project(projectName, UUID);
projectList.push(addProject);
renderProject();
document.querySelector("#projectName").value = "";
};

function renderProject() {
  const projectContainer = document.createElement("div");
  projectContainer.classList.add("project-container");
  projectContainer.setAttribute("id",projectList[projectList.length-1].identifier)
  projectContainer.innerHTML = projectList[projectList.length-1].projectName + 
  '<button class="projectDoneButton icon-button"><span class="glyphicon glyphicon-ok"></span></button>' + 
  '<button class="projectDeleteButton icon-button"><span class="glyphicon glyphicon-trash"></span></button>'
  document.getElementById('projectHolder').appendChild(projectContainer);
  console.log(projectContainer.id)
  get projectDoneButton to remove the projectContainer and splice the projectList
}

// projectContainer.id is not part of the projectList though that's why the id isn't showing there.
// projectList will remain the same if it's just the ProjectNameValue
// so make projectList a name of the containers. But then that's combining functions.
// so give the UUID when the name is generated



  // i may need a supra container for project container
  // books, the delete was attached outside, this makes it harder.
  // in library, I used the same remove button for everyone. 
  // when the remove button is clicked, reference the id of container that numberContainer assigns
  // remove the corresponding container in the array.
  // the problem is the "remove" button is part of inner html now so it can't be on the outside and attached.
  // it doesn't work on the inside because numberProjects is called on every render
  
// my other option is to generate the button with a value of the id?
// make each button that is getting clicked have some sort of identifier for that particular project
// Then when you click it, event.target.value will tell you which project goes.
// generate a container, give it an id; click gives you event target value, delete that id when trash is pressed


function createUUID() {
  var s = [];
  var hexDigits = "0123456789abcdef";
  for (var i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = "-";
  return s.join("");
}




  // const projectDeleteButton = document.querySelector(".projectDeleteButton")
  // projectDeleteButton.addEventListener("click", function(event){
  //   numberProjects();
  //   let projectId = projectContainer.getAttribute('id');
  //   // containerId of bookContainer corresponds to place in the array
  //   projectList.splice(+projectId, 1);
  //   projectContainer.remove();
  //   console.log(projectList)
  // })



  // numberProjects();
  // let projectId = projectContainer.getAttribute('id');
  // console.log(projectId);
  // console.log(projectList)
// }


// projectDeleteButton.addEventListener("click", function(event){
//   numberProjects();
//   let projectId = projectContainer.getAttribute('id');
//   // containerId of bookContainer corresponds to place in the array
//   projectList.splice(+projectId, 1);
//   projectContainer.remove();
//   console.log(projectList)
// })





//number function is only activated when delete is pressed
//then it gets the id of the container it's in
//and splices.



//   let projectId = projectContainer.getAttribute('id');
//   const projectDeleteButton = document.querySelector(".projectDeleteButton")
//   projectDeleteButton.addEventListener("click", function(event){alert(projectId)})


  // projectContainer.setAttribute('id', `${projectList.length - 1}`);
  // const projectDeleteButton = document.querySelector(".projectDeleteButton")
  // projectDeleteButton.addEventListener("click", function(event){
  //   numberProjects();
  //   let projectId = projectContainer.getAttribute('id');
  //   alert(projectId)
    // containerId of bookContainer corresponds to place in the array
    // projectList.splice(+projectId, 1);
    // projectContainer.remove();
    // console.log(projectList)


// const projectDeleteButton = document.querySelector(".projectDeleteButton")

  // use value="<index>"?

  // console.log(projectList);

  // const projectDeleteButton = document.querySelector(".projectDeleteButton")
  // projectDeleteButton.addEventListener("click", function(event){
  //   numberProjects();
  //   alert(projectContainer.id)});

  //   let projectId = projectContainer.getAttribute('id');
  //   myLibrary.splice(+projectId, 1);
  //   projectContainer.remove();
  //   console.log(projectList);}


  // console.log(projectContainer.id)
  // console.log(Object.getOwnPropertyNames(projectList))
  

  // This does not work because it is only applied to the latest
  // const projectDeleteButton = document.querySelector(".projectDeleteButton")
  // projectDeleteButton.addEventListener("click", function(event){
  //   alert(projectContainer.id)})
// };

function numberProjects() {
  let allProjects = document.querySelectorAll('.project-container');
  let i = allProjects.length-1;
  allProjects.forEach(element => {
      element.setAttribute('id', i);
      i--;})
  // only numberProjects when altering

  // this doesn't work because it goes through every element in all projects
  // allProjects.forEach(element => {
  //   element.addEventListener("click", function(event){
  //     alert(element.id)})
  // })
}






// first step is to get the button working
function setProjectDeleteButton() {
  const projectDeleteButton = document.querySelector(".projectDeleteButton")
  projectDeleteButton.setAttribute('id', `${myLibrary.length - 1}`);
  projectDeleteButton.classList.add('delete')
  projectDeleteButton.addEventListener("click", function(event){
    alert("Deleted")
      // numberProjects();
      // let projectId = projectContainer.getAttribute('id');
      // projectList.splice(+projectId, 1);
      // projectContainer.remove();
})
}


// /// this is kind of like the library check marks for read -- review that
// const projectDoneButton = document.querySelector(".projectDoneButton")
// projectDoneButton.addEventListener("click", e => {
//      strikethroughProject();
//      });

// const projectTrashButton = document.querySelector(".projectTrashButton")
// projectTrashButton.addEventListener("click", e => {
//      trashProject();
//      });

// function strikethroughProject() {alert("strikethrough")}
// function trashProject() {alert("trash")}










// const submitButton = document.querySelector(".projectSubmitButton")
// submitButton.addEventListener("click", e => {
//      e.preventDefault();
//      addProjectToList();
//      });


/// at the end of each project line, checkmark (strikethrough) and delete icons
/// why is project not hidden upon opening?
/// review ClassyLibrary to see if classes are more appropriate


// let taskList = []

// function Task(taskName, dueDate, priority, done, trashTask, notes) {
// // expand to add done, comment and delete
//     this.taskName = taskName;
//     this.dueDate = dueDate;
//     this.dueDatedueDate = priority;
//     this.done = done;
//     this.trashTask = trashTask;
//     this.notes = notes
// }
// I can hide the notes field the same way I hid projects input



// function addTaskToList() {
//     let taskName = document.querySelector("#taskName").value;
//     let dueDate = document.querySelector("#dueDate").value;
//     let priority = document.querySelector("#priority").value;
//     let done = document.querySelector("#done").checked;
//     let trashTask = document.querySelector("#trashTask").checked;
//     let notes = document.querySelector("#notes").value;
//     var addTask = new Task(title, fname, lname, pubDate, contrib, own);
//     taskList.push(addTask);
//     render();
//     document.querySelector("#taskName").value = "";
//     document.querySelector("#dueDate").value = "";
//     document.querySelector("#priority").value = "";
//     document.querySelector("#done").checked = false;
//     document.querySelector("#trashTask").checked = false;
//     document.querySelector("#notes").value = "";
//    };












// let myLibrary = [];

// // organize in a row, then expand for notes

// const test2 = new Book("White Teeth", "Zadie", "Smith", "2000", "Andrew", true);
// myLibrary.push(test2);
// document.getElementById("own").checked = true;
// render(test2);
// document.getElementById("own").checked = false;


// const submitButton = document.querySelector(".submitButton")
// submitButton.addEventListener("click", e => {
//   // the prevents the field from clearing on submit
//   e.preventDefault();
//   addBookToLibrary();
//   })

// function Book(title, fname, lname, pubDate, contrib, own) {
//   this.title = title;
//   this.fname = fname;
//   this.lname = lname;
//   this.pubDate = pubDate;
//   this.contrib = contrib;
//   this.own = own;
// };

// function addBookToLibrary() {
//   let title = document.querySelector("#title").value;
//   let fname = document.querySelector("#fname").value;
//   let lname = document.querySelector("#lname").value;
//   let pubDate = document.querySelector("#pubDate").value;
//   let contrib = document.querySelector("#contrib").value;
//   let own = document.querySelector("#own").checked;
//   var addBook = new Book(title, fname, lname, pubDate, contrib, own);
//   // I could just put document.querySelector values into var addBook but this is clearer
//   myLibrary.push(addBook);
//   render();
//   document.querySelector("#title").value = "";
//   document.querySelector("#fname").value = "";
//   document.querySelector("#lname").value = "";
//   document.querySelector("#pubDate").value = "";
//   document.querySelector("#contrib").value = "";
//   document.querySelector("#own").checked = false;
//   // I can also shorten this with form.reset()
//   // https://discord.com/channels/505093832157691914/690590001486102589/736653879684628491
// };


// function render() {
//   // this adds in the first batch of info to the card

//   const bookContainer = document.createElement("div");
//   bookContainer.classList.add("book-container");

//   const newVolume = document.createElement("div");
//   newVolume.classList.add("volume");
//   bookContainer.appendChild(newVolume);

//   const frontCover = document.createElement("div");
//   newVolume.appendChild(frontCover);
 
//   frontCover.style.setProperty("background-color", getRandomColor());
//   frontCover.setAttribute('id', myLibrary.length - 1 + "");
//   frontCover.innerHTML = "<br /><br />"
//                         + "<b>" + myLibrary[myLibrary.length-1].title + "</b>" + "<br /><br />" 
//                         + myLibrary[myLibrary.length-1].fname + "&nbsp;"
//                         + myLibrary[myLibrary.length-1].lname + "<br /><br />"
//                         + "Published: " + myLibrary[myLibrary.length-1].pubDate + "<br />"
//                         + "Added by: <br />" + myLibrary[myLibrary.length-1].contrib + "<br />";
                        
//   // this works off the checkbox, adds it to the rendered volume and interprets value given
// const checkbox = document.createElement('input'); 
// checkbox.type = "checkbox"; 
// checkbox.id = "checkbox"; 

// if (document.getElementById("own").checked == true) {checkbox.checked = true}
// else {checkbox.checked = false};

// checkbox.addEventListener("change", function() {
//   numberContainers();
// // number the array, for each volume, it gets an id number, ie <div id="1">
//   let containerId = bookContainer.getAttribute('id');
// // take the id number and add a + to make it a number
// // corresponds to its place in the array
//   if (checkbox.checked === false) {
//     myLibrary[+containerId].own = false;
//   } else if (checkbox.checked === true) {
//     myLibrary[+containerId].own = true
//   }
//   console.log(myLibrary)
// });

// const label = document.createElement("label"); 
// label.appendChild(document.createTextNode(" I own a copy")); 
// const newgraf = document.createElement("p")

// frontCover.appendChild(checkbox);
// frontCover.appendChild(label);
// frontCover.appendChild(newgraf);

// const removeButton = document.createElement('button')
// frontCover.appendChild(removeButton)
// removeButton.setAttribute('id', `${myLibrary.length - 1}`);
// removeButton.classList.add('remove')
// removeButton.textContent = 'Remove';
// removeButton.addEventListener("click", function(event){
//     numberContainers();
//     let containerId = bookContainer.getAttribute('id');
//     // containerId of bookContainer corresponds to place in the array
//     myLibrary.splice(+containerId, 1);
//     bookContainer.remove();
//     console.log(myLibrary)
// })

// TaskListContainer.insertAdjacentElement('afterbegin',bookContainer);
// };

// function numberContainers() {
//   let allContainers = document.querySelectorAll('.book-container');
//   let i = allContainers.length-1;
//   allContainers.forEach(element => {
//       element.setAttribute('id', i);
//     // each volume gets an id equal to its place in the array
//     // starting with the latest addition and giving id number backwards
//     // because i arranged the .css to have the newest first
//       i--;
//   })
// }

// function getRandomColor() {
//   color = "hsl(" + Math.random() * 360 + ", 100%, 20%)";
//   return color;
// }


// // Inpiration for the remove button:
// // https://github.com/JuicyMelon/Library

// // For checkbox, I used
// // https://www.geeksforgeeks.org/html-dom-input-checkbox-property/

// // Get the modal
// var modal = document.getElementById("myModal");

// // Get the button that opens the modal
// var btn = document.getElementById("myBtn");

// // Get the <span> element that closes the modal
// var span = document.getElementsByClassName("close")[0];

// // When the user clicks on the button, open the modal
// btn.onclick = function() {
//   modal.style.display = "block";
// }

// // When the user clicks on <span> (x), close the modal
// span.onclick = function() {
//   modal.style.display = "none";
// }

// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// }