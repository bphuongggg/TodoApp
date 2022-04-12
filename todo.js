const todoList = document.querySelector("ul");
function addNewTodo(event) {
  if (event.keyCode == 13) {
    var todo = document.getElementById("new-todo");
    console.log(todo.value);

    createNewTodoElement(todo.value);
    document.getElementById("toggle-icon").style.display="block"
    document.getElementById("main").style.display="block";
    document.getElementById("footer").style.display="block";
   todo.value = "";
  }
}

function createNewTodoElement(text){
  
   var todoElement = document.createElement("li");
   var todoView = document.createElement("div");
   var todoCheck = document.createElement("input");
   var todoLabel = document.createElement("label");
   var todoDelete = document.createElement("button");
   var todoEdit = document.createElement("input");    

    todoView.className = "view";
    todoCheck.className = "toggle";
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

todoList.addEventListener('click', (event) => {
  console.log(event.target.className = 'destroy');
  if (event.target.className== 'destroy') {
    const myParent = event.target.parentElement;
    myParent.parentElement.remove();
  }
})

