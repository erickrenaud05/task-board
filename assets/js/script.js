// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

//easeOfUseFeature
const modalWarningMessage = $('<p>').text('Please make sure to fill out all three input boxes!!').addClass('text-danger fw-bold');
const modalForm = $('form');
// Todo: create a function to generate a unique task id
function generateTaskId(task) {
    if(!nextId) {
        nextId = []
    }
    nextId++;
    localStorage.setItem('nextId', JSON.stringify(nextId));
    return nextId;
}

// Todo: create a function to create a task card
function createTaskCard(task) {
    //tasks cards will be created in div with id of 'todo-cards'
    //task cards have a header with the title, a content area with the description
    //the date and a delete button
    //the task card color scheme is dependent on the status

    //create every element of the card with classes found on bootstrap
    const cardArea = $('<li>').addClass('m-2').attr('id', task.Id).attr('style', 'background: white');
    const newCardHeaderEl = $('<h5>').addClass('card-header');
    const newCardContentEl = $('<div>').addClass('card-body');
    const newCardDescriptionEl = $('<p>').addClass('card-text');
    const newCardDueDateEl = $('<h6>').addClass('card-title');
    const newCardDeleteButton = $('<button>').attr('type', 'button').addClass('btn btn-danger').text('delete');
    // adding id to button for event purposes
    newCardDeleteButton.attr('id', task.Id);
    //add content to each element based on the task
    newCardHeaderEl.text(task.title);
    newCardDescriptionEl.text(task.description);
    newCardDueDateEl.text(task.dueDate);

    //color based on status
    if(task.status === 'overdue') {
        cardArea.addClass('bg-danger text-white');
        newCardDeleteButton.addClass('border border-light');
    } else if(task.status === 'dueSoon') {
        cardArea.addClass('bg-warning text-white');
    }
    //append content to there appropriate sections of the card
    newCardContentEl.append(newCardDescriptionEl, newCardDueDateEl, newCardDeleteButton);
    cardArea.append(newCardHeaderEl, newCardContentEl);

    return cardArea;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    // take the task list and use the createTaskCard in here to render based on state
    const todoAreaEl = $('#todo-cards').html('');
    const todoListEl = $('<ul>').css('list-style-type', 'none')
        .addClass('connectedSortable card col-8 p-0 border-0 bg-light').attr('id', 'sortable1');
    const inProgressAreaEl = $('#in-progress-cards').html('');
    const inProgressListEl = $('<ul>').css('list-style-type', 'none').attr('id', 'sortable2')
        .addClass('connectedSortable card col-8 p-0 border-0 bg-light ');
    const doneAreaEl = $('#done-cards').html('');
    const doneListEl = $('<ul>').css('list-style-type', 'none').attr('id', 'sortable3')
        .addClass('connectedSortable card col-8 p-0 border-0 bg-light');

    todoAreaEl.addClass('h-100');
    inProgressAreaEl.addClass('h-100');
    doneAreaEl.addClass('h-100');
        
        for (let task in taskList) {
        if (taskList[task].state === 'todo') {
            todoListEl.append(createTaskCard(taskList[task]));
        } else if (taskList[task].state === 'inProgress') {
            inProgressListEl.append(createTaskCard(taskList[task]));
        } else if (taskList[task].state === 'done') {
            doneListEl.append(createTaskCard(taskList[task]));
        }
    }

    todoAreaEl.append(todoListEl);
    inProgressAreaEl.append(inProgressListEl);
    doneAreaEl.append(doneListEl);
    
}
// Todo: create a function to handle adding a new task
function handleAddTask(event){
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
    };

    var newTaskId = generateTaskId(newTask);
    newTask.Id = newTaskId;
    //create the card here for now to visualize changes
    // createTaskCard(newTask);

    //making sure that all elements of the tasks are filled out
    
    for (attributes in newTask) {
        if(!newTask[attributes]) {
            modalForm.append(modalWarningMessage);
            event.preventDefault();
            return;
        }
    }

    $('#submitTask').attr('data-bs-dismiss', 'modal');
    
    if(!taskList) {
        taskList = [];
    }
    taskList.push(newTask);
 
    //3: store object to localStorage in array of forms
    localStorage.setItem('tasks', JSON.stringify(taskList));
    
    renderTaskList();
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){
    var confirmation = confirm('Are you sure you want to delete this task? This action is permanent. If you wish to delete, press ok, if you wish to keep the task press cancel');

    if(confirmation) {
        var x = 0;       
        for (var task of taskList) {
            if (task.Id == event.target.id){
                taskList.splice(x, 1);
                localStorage.setItem('tasks', JSON.stringify(taskList));
                window.location.reload();
            }
            x++;
        }
    }
   
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    // ui.draggable[0].dataset.projectId

    for (var task of taskList) {
        // console.log(ui) is where task id is ui[0].id
        // console.log(event) is where the drop id is event.target.id
        if(task.Id == ui.draggable[0].id) {
            if(event.target.id === 'sortable1') {
                task.state = 'todo';
            } else if(event.target.id === 'sortable2') {
                task.state = 'inProgress';
            } else if(event.target.id === 'sortable3') {
                task.state = 'done';
            }
        }
    }
    localStorage.setItem('tasks', JSON.stringify(taskList));
}

const addTask = $('#formModal');
// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    renderTaskList();

    addTask.on('submit', handleAddTask);
    $('.btn-danger').click(handleDeleteTask);

    $( function() {
        $( "#datepicker" ).datepicker();
        $( "#sortable1, #sortable2, #sortable3" ).sortable({
            connectWith: ".connectedSortable",
            dropOnEmpty: true,
          })
        $('#sortable1, #sortable2, #sortable3').droppable({
            drop: handleDrop
        })
      } );
});




