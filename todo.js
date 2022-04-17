const todoList = document.querySelector("ul");
const todoItem= document.querySelector("li");
const todoCount = document.querySelector(".todo-count strong");
const todoComplete = document.querySelector(".clear-completed");
function addNewTodo(event) {
  if (event.keyCode == 13) { 
    var todo = document.getElementById("new-todo");
    
      if(todo.value.trim().length > 0){
        console.log(todo.value);
        createNewTodoElement(todo.value);
        setCountTodo(1);
        document.getElementById("toggle-icon").style.display="block"
        document.getElementById("main").style.display="block";
        document.getElementById("footer").style.display="block";
      todo.value = "";
      }
  }
}
//update todo item
function setCountTodo(number){
  todoCount.innerText = +todoCount.innerText + number;
}
// create list todo
function createNewTodoElement(text){
  
   var todoElement = document.createElement("li");
   var todoView = document.createElement("div");
   var todoCheck = document.createElement("input");
   var todoLabel = document.createElement("label");
   var todoDelete = document.createElement("button");
   var todoEdit = document.createElement("input");    

    todoView.className = "view";
    todoCheck.className = "toggle";
    todoCheck.type="checkbox";
    todoDelete.className = "destroy";
    todoEdit.className = "edit";

   todoLabel.innerHTML = text;

   todoElement.appendChild(todoView);
   todoView.appendChild(todoCheck);
   todoView.appendChild(todoLabel);
   todoView.appendChild(todoDelete);
   todoElement.appendChild(todoEdit);
   
   todoList.appendChild(todoElement);
}
// remove todo item
todoList.addEventListener('click', (event) => {
  
  if (event.target.classList.contains('destroy')) {
    const myParent = event.target.parentElement;
    myParent.parentElement.remove();
    if(!((event.target).parentElement).parentElement.classList.contains('completed'))
      setCountTodo(-1);
  }

  if(event.target.classList.contains('toggle')){
    var checkInput = event.target;
    var completedInput = event.target.parentElement;
    
    if(checkInput.checked == true){
      completedInput.parentElement.classList.add("completed");
      setCountTodo(-1);
    }
    else{
      completedInput.parentElement.classList.remove("completed");
      setCountTodo(1);
    }
    console.log(checkInput.checked);
  }
  
})
// clear completed item   

todoComplete.addEventListener('click', (event) => {
  var complete = document.getElementsByClassName("completed");
  console.log(complete);

});

