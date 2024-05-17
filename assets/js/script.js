// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() {

}

// Todo: create a function to create a task card
function createTaskCard(task) {

}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

}
// Todo: create a function to handle adding a new task
function handleAddTask(event){
    //jquery effect slide!!
    // pseudo code:
    //1: create form requiring three inputs
    const titleLabel = $('<label>').text('task title');
    const titleInput = $('<input>').addClass('form-control form-control-sm');
    const dateLabel = $('<label>').text('date: ');
    const dateInput = $('<input>').attr('id', 'datepicker');
    const taskLabel = $('<label>').text('task description');
    const taskInput = $('<textArea>');
    
    const newTask = $('<div>');
    
    taskLabel.append(taskInput);
    titleLabel.append(titleInput);
    dateLabel.append(dateInput);
    newTask.append(titleLabel, dateLabel, taskLabel);
    //2: make form slide down using jquery slide when add task is hit
    //3: add task button saves task to local save
    //4: form slides back out
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

});

$( function() {
    $( "#datepicker" ).datepicker();
  } );
