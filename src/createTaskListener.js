function createTaskListener() {
    let taskBtn = document.getElementById("taskBtn");
    taskBtn.addEventListener("click", function(event){ 
    taskOverallContainer.classList.toggle("flex");
    })
    };

export default createTaskListener;