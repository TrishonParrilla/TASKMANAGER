

// An example of changing the logic execution
function hello() {
    console.log("Hello World");
}

function saveTask ()
{
    console.log("Saving Task");
    const title = $("#txtTitle").val();
    const desc = $("#txtDescription").val();
    const color = $("#selColor").val();
    const date = $("#selDate").val();
    const status = $("#selStatus").val();
    const budget = $("#numBudget").val();

    const task = new Task(title,desc,color,date,status,budget);
    console.log(task);
    displayTask(task);
}

function displayTask(task)
{
    //grabs object and concatinate elements onto page
    let syntax = `
    <div class="task" style="border-color:${task.color}">
      <div class="info">
        <h4>${task.title}</h4>
        <p>${task.desc}</p>
      </div>
      <label class="status">${task.status}</label>
      <div class="date-budget">
        <label>Due: ${task.date}</label>
        <label>Budget: $${task.budget}</label>
      </div>
    </div>`;
    
  // Inject the new HTML into the DOM Tree
  $(".list").append(syntax);
}

//define the URL of the server
const API = "https://106api-b0bnggbsgnezbzcz.westus3-01.azurewebsites.net/api/tasks";

//ajax is jquery function that allows for asynchronous connection
function loadTasks(){
    $.ajax({
        type:"GET", // HTTP Read Method
        url: API, //called page
        success: function(data) {
            console.log("data recieved", data);
        },
        error: function(error){
            console.log("Error",error);
        }
    })
}

function init ()

{
    hello();
    console.log("Hello This is the DOM");
    $("#btnSave").click(saveTask);

    //load (GET) data from server
    loadTasks();
}

//forces my logic  my logic to run after the page is loaded
window.onload = init;