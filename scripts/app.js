

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
    //send to server
        $.ajax({
        type:"POST", //creating to server
        url:API,
        data:JSON.stringify(task),
        contentType:"application/json",
        success: function(created) {
            console.log(created);
            displayTask(created);
        },

        error: function(err) {
            console.log(err);
        }

          })

}



//mini challenge
//use put method to update one of the existing entries
//tip: you must use the ID- url: API/https://106api-b0bnggbsgnezbzcz.westus3-01.azurewebsites.net/api/tasks/#
    function update() {
    $.ajax({
        type:"PUT",
        url:API + "/2",
        data:JSON.stringify({title: "Hello my name is parrilla"}),
        contentType:"application/json",
        success: function(response) {
            console.log(response);
        },

        error: function(err) {
            console.log(err);
        }

    })
}


function displayTask(task)
{
    //grabs object and concatinate elements onto page
    let syntax = `
    <div class="card" id="${task.id}" style="background-color:${task.color}">
      <div class="info">
        <h4>${task.title}</h4>
        <p>${task.desc}</p>
      </div>
      <label class="status">${task.status}</label>
      <div class="date-budget">
        <label>Due: ${task.date}</label>
        <label>Budget: $${task.budget}</label>

        <div> 
        <button class="btn-delete">Delete</button>
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
        dataType: "json", //expected format
        success: function(data) {
            console.log("data recieved", data);
        },
        error: function(error){
            console.log("Error",error);
        }
    })
}

function deleteTask() {
    console.log("Deleting Task");
    //1. context: "this" is the specific button that was clicked
    let btn = $(this);
    //2. find the parent div 
    let TaskElement = btn.parents(".card");
    //3. extraction: Get the ID we saved in the HTML
    let id = TaskElement.attr("id");
    console.log("Element to delete", id);
    //4.server communication
    $.ajax(
        {
            type:"DELETE", //http: verb delete
            url: API + "/"+ id,
            success:function(){
                //removed the element
                TaskElement.fadeOut(500,function(){
                    $(this).remove();//remove element from dom
                });
            },
            error:function(err)
            {
                console.log(err);
            }
        }
    )

}


function init ()

{
    hello();
    console.log("Hello This is the DOM");
    $("#btnSave").click(saveTask);
    $(".btn-delete").click();
    $(".list").on("click", ".btn-delete", deleteTask);



    //load (GET) data from server
    loadTasks();

}

//forces my logic  my logic to run after the page is loaded
window.onload = init;