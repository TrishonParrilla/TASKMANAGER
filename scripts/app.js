

// An example of changing the logic execution

function hello() {
    console.log("Hello World");
}
function init ()

{
    console.log("Hello This is the DOM");
    hello();

}

//forces my logic  my logic to run after the page is loaded
window.onload = init;