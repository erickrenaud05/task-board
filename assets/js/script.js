// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId(task) {
    // id will be based on status and position
    // three unique ids for each section, then the order of the items 
    if(!nextId) {
        nextId = {
            toDo: 0,
            inProgress: 0,
            done: 0
        }
    }
    
    if (task.state === 'todo') {
        nextId.toDo++;
        localStorage.setItem('nextId', JSON.stringify(nextId));
        return nextId.toDo;
    } else if (task.state === 'inProgress') {
        nextId.inProgress++;
        localStorage.setItem('nextId', JSON.stringify(nextId));
        return nextId.inProgress;
    } else if (task.state === 'done') {
        nextId.done++;
        localStorage.setItem('nextId', JSON.stringify(nextId));
        return nextId.done;
    }

    //if the code gets to this point there is an unknown error
    console.log('unknown error');
    return 1
}

// Todo: create a function to create a task card
function createTaskCard(task) {
    //tasks cards will be created in div with id of 'todo-cards'
    //task cards have a header with the title, a content area with the description
    //the date and a delete button
    //the task card color scheme is dependent on the status

    //create every element of the card with classes found on bootstrap
    const cardArea = $('#todo-cards');
    const newCardEl = $('<div>').addClass('card col-8 m-2');
    const newCardHeaderEl = $('<h5>').addClass('card-header');
    const newCardContentEl = $('<div>').addClass('card-body');
    const newCardDescriptionEl = $('<p>').addClass('card-text');
    const newCardDueDateEl = $('<h6>').addClass('card-title');
    const newCardDeleteButton = $('<button>').attr('type', 'button').addClass('btn btn-danger').text('delete');

    //add content to each element based on the task
    newCardHeaderEl.text(task.title);
    newCardDescriptionEl.text(task.description);
    newCardDueDateEl.text(task.dueDate);

    //color based on status
    if(task.status === 'overdue') {
        newCardEl.addClass('bg-danger text-white');
        newCardDeleteButton.addClass('border border-light');
    } else if(task.status === 'dueSoon') {
        newCardEl.addClass('bg-warning text-white');
    }
    //append content to there appropriate sections of the card
    newCardContentEl.append(newCardDescriptionEl, newCardDueDateEl, newCardDeleteButton);
    newCardEl.append(newCardHeaderEl, newCardContentEl);
    cardArea.append(newCardEl);

    //add draggable feature
    newCardEl.draggable({
        opacity: '35%',
        helper: 'clone',
        revert: 'invalid'
    });
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
        state: 'todo',
        //added during task id branch
    };

    var newTaskId = generateTaskId(newTask);
    newTask.Id = newTaskId;
    //create the card here for now to visualize changes
    createTaskCard(newTask);
    
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
