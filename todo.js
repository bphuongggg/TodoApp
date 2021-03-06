const todoList = document.querySelector("ul");
const todoItem = document.querySelector("li");
const todoCount = document.querySelector(".todo-count strong");
const todoComplete = document.querySelector(".clear-completed");
function addNewTodo(event) {
  if (event.keyCode == 13) {
    var todo = document.getElementById("new-todo");
    if (todo.value.trim().length > 0) {
      createNewTodoElement(todo.value);
      setCountTodo(1);
      document.getElementById("toggle-icon").style.display = "block";
      document.getElementById("main").style.display = "block";
      document.getElementById("footer").style.display = "block";
      todo.value = "";
    }
  }
}
function setCountTodo(number) {
  todoCount.innerText = +todoCount.innerText + number;
}
function createNewTodoElement(text) {
  var todoElement = document.createElement("li");
  var todoView = document.createElement("div");
  var todoCheck = document.createElement("input");
  var todoLabel = document.createElement("label");
  var todoDelete = document.createElement("button");
  var todoEdit = document.createElement("input");

  todoView.className = "view";
  todoCheck.className = "toggle";
  todoCheck.type = "checkbox";
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
todoList.addEventListener("click", (event) => {
  if (event.target.classList.contains("destroy")) {
    const myParent = event.target.parentElement;
    myParent.parentElement.remove();
    if (
      !event.target.parentElement.parentElement.classList.contains("completed")
    )
      setCountTodo(-1);
  }

  if (event.target.classList.contains("toggle")) {
    var checkInput = event.target;
    var completedInput = event.target.parentElement;

    if (checkInput.checked == true) {
      completedInput.parentElement.classList.add("completed");
      setCountTodo(-1);
    } else {
      completedInput.parentElement.classList.remove("completed");
      setCountTodo(1);
    }
  }
  
})
function filterClick(id){
  document.querySelectorAll('.filters li a').forEach(id => {
      id.addEventListener('click', (event)=>{
        if(event.target){
          id.classList.add("selected");
        }
      })
      id.classList.remove("selected");
    })
};
document.querySelector("#_completed").addEventListener('click', (event)=>{
  document.querySelectorAll(".todo-list li").forEach(item =>{
   if(!item.classList.contains('completed')){
     console.log(!item.classList.contains('completed'));
     item.classList.add("hidden");
   } 
   else{item.classList.remove("hidden");}
  })
})

document.querySelector(".clear-completed").addEventListener('click', (event)=>{
  var delCompleted = document.querySelectorAll(".completed");
  delCompleted.forEach(item => {
    item.remove();
  });
});
document.querySelector("#_all").addEventListener('click', (event)=>{
  document.querySelectorAll(".todo-list li").forEach(item =>{
   if(!item.classList.contains('completed')){ 
     item.classList.remove("hidden");
   } 
   else{item.classList.remove("hidden");}
  })
})

document.querySelector("#_active").addEventListener('click', (event)=>{
  document.querySelectorAll(".todo-list li").forEach(item =>{
   if(item.classList.contains('completed')){ 
     item.classList.add("hidden");
   } 
   else{item.classList.remove("hidden");}
  })
})

