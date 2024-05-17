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
    event.preventDefault();
    // pseudo code:
    //1: store form input variables
    var taskTitle = $('input[name="taskTitle"]');
    var taskDueDate = $('input[name="taskDueDate"]');
    var taskDescription = $('textArea[name="taskDescription"]');
    //2: create object to store form input
    // Form object should contain the following, title, due-date, description, status and state
    //status is based on comparing the due date to the current-date, state will determine what colomn its in
    //05/01/2024 format the date picker holds its date
    const timeToDeadline = dayjs(taskDueDate.val()).diff(dayjs(), 'days');
    //comparing the due date to today to determine status
    var taskStatus = '';
    if(timeToDeadline < 0) {
        taskStatus = 'overdue';
    } else if(timeToDeadline > 3) {
        taskStatus = 'noneUrgent';
    } else {
        taskStatus = 'dueSoon';
    }
    
    const newTask = {
        title: taskTitle.val(),
        dueDate: taskDueDate.val(),
        description: taskDescription.val(),
        status: taskStatus,
        state: 'todo'
    };
    
    if(!taskList) {
        taskList = [];
    }
    taskList.push(newTask);
 
    //3: store object to localStorage in array of forms
    localStorage.setItem('tasks', JSON.stringify(taskList));

    //reset form and make modal leave
    taskDescription.val('');
    taskDueDate.val('');
    taskTitle.val('');
    
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    const addTask = $('#formModal');

    addTask.on('submit', handleAddTask);
});



$( function() {
    $( "#datepicker" ).datepicker();
  } );
