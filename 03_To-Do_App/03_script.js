// Accessing the Elements
const inputBox = document.getElementById("input-box")
const listContainer = document.getElementById("list-container")
const addBtn = document.getElementById("addBtn");

//When we click the add button
addBtn.addEventListener("click", addTask);

//When we press Enter in the input
inputBox.addEventListener("keyup", function(e) {
    if(e.key === "Enter") {
        addTask(); //call the add task function
    }
})

//function to add a new task
function addTask() {
    if(inputBox.value === "") { //check if input is empty
        alert("You must write something");
        return;
    }
    
    let li = document.createElement("li"); //create new task
    li.innerHTML = inputBox.value; //put typed text inside
    listContainer.appendChild(li); //add it to the list

    let span = document.createElement("span"); //create del button
    span.innerHTML = "\u00d7"; //x symbol
    li.appendChild(span); //add x button to task
    
    inputBox.value = ""; //clear input
    saveData();
}

//When we click on a task or the X button
listContainer.addEventListener("click", function(e) {
    if(e.target.tagName === "LI") {
        e.target.classList.toggle("checked"); //Mark task as done/undone
        saveData(); //save changes
    }
    else if(e.target.tagName === "SPAN") {
        e.target.parentElement.remove(); //remove the task
        saveData(); 
    }
});

// function to save Tasks.
function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

// functions to load tasks
function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}
showTask(); //call this when page loads

