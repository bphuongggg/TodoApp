import { toDos } from './todoClass.js';
class toDoList {
    constructor() {
        this.listTodo = [];
        this.todoList = document.querySelector('ul');
        this.todoCount = document.querySelector('.todo-count strong');
        this.loadForm();
        this.loadData();
    }
    loadData() {
        const data = JSON.parse(localStorage.getItem('todoList'));
        if (data != null) {
            data.forEach((element) => {
                if (element.todoState == false) {
                    this.setCountTodo(1);
                }
                this.createNewTodoElement(element.todoInput, element.todoState);
                this.listTodo.push(new toDos(element.todoInput, element.todoState));
            });
            document.getElementById('toggle-icon').style.display = 'block';
            document.getElementById('main').style.display = 'block';
            document.getElementById('footer').style.display = 'block';
        }
    }
    loadForm() {
        let valInput = document.getElementById('new-todo');
        valInput.addEventListener('keypress', (event) => {
            if (event.keyCode == 13) {
                var todo = valInput.value;
                if (todo.trim().length > 0) {
                    this.createNewTodoElement(todo, false);
                    this.setCountTodo(1);
                    document.getElementById('toggle-icon').style.display = 'block';
                    document.getElementById('main').style.display = 'block';
                    document.getElementById('footer').style.display = 'block';
                    valInput.value = '';
                    this.addNewTodoForList(todo, false);
                }
            }
        });
        this.clearCompleted();
        this.filterForTodo();
    }
    setCountTodo(number) {
        this.todoCount.innerHTML = +this.todoCount.innerHTML + number;
    }
    createNewTodoElement(todoInput, todoState) {
        var todoElement = document.createElement('li');
        var todoView = document.createElement('div');
        var todoCheck = document.createElement('input');
        var todoLabel = document.createElement('label');
        var todoDelete = document.createElement('button');
        var todoEdit = document.createElement('input');
        todoView.className = 'view';
        todoCheck.className = 'toggle';
        todoCheck.type = 'checkbox';
        todoCheck.addEventListener('click', (event) => {
            this.changeStateForTodo(event.target.closest('li'));
            var checkInput = event.target;
            var completedInput = event.target.parentElement;
            if (checkInput.checked == true) {
                completedInput.parentElement.classList.add('completed');
                this.setCountTodo(-1);
            }
            else {
                completedInput.parentElement.classList.remove('completed');
                this.setCountTodo(1);
            }
        });
        if (todoState) {
            todoCheck.setAttribute('checked', 'checked');
            todoElement.classList.add('completed');
        }
        todoDelete.className = 'destroy';
        todoDelete.addEventListener('click', (event) => {
            var todoRemove = event.target.closest('li');
            this.removeTodo(todoRemove);
            todoRemove.remove();
            if (!event.target.parentElement.parentElement.classList.contains('completed'))
                this.setCountTodo(-1);
        });
        todoEdit.className = 'edit';
        todoLabel.innerHTML = todoInput;
        todoElement.appendChild(todoView);
        todoView.appendChild(todoCheck);
        todoView.appendChild(todoLabel);
        todoView.appendChild(todoDelete);
        todoElement.appendChild(todoEdit);
        this.todoList.appendChild(todoElement);
    }
    saveTodo() {
        localStorage.setItem('todoList', JSON.stringify(this.listTodo));
    }
    getIndexInTodo(element) {
        var node = Array.from(element.closest('ul').children);
        var index = node.indexOf(element);
        return index;
    }
    getStateTodo(element) {
        return element.querySelector("input[type='checkbox']").checked;
    }
    checkIfTodoIsCompleted() {
        return true;
    }
    changeStateForTodo(element) {
        var state = this.getStateTodo(element);
        var index = this.getIndexInTodo(element);
        this.listTodo[index].setState(state);
        this.saveTodo();
    }
    addNewTodoForList(todoInput, todoState) {
        this.listTodo.push(new toDos(todoInput, todoState));
        this.saveTodo();
    }
    removeTodo(element) {
        for (let i = 0; i < this.listTodo.length; i++) {
            this.listTodo.splice(this.getIndexInTodo(element), 1);
            break;
        }
        this.saveTodo();
    }
    clearCompleted() {
        document.querySelector('.clear-completed').addEventListener('click', (event) => {
            let delCompleted = document.querySelectorAll('.completed');
            delCompleted.forEach((item) => {
                this.listTodo.splice(this.getIndexInTodo(item), 1);
                item.remove();
            });
            this.saveTodo();
        });
    }
    filterForTodo() {
        document.querySelector('#_completed').addEventListener('click', () => {
            document.querySelectorAll('.todo-list li').forEach((item) => {
                if (!item.classList.contains('completed')) {
                    item.classList.add('hidden');
                }
                else {
                    item.classList.remove('hidden');
                }
                this.changeColorFilterTodo('_completed');
            });
        });
        document.querySelector('#_all').addEventListener('click', () => {
            document.querySelectorAll('.todo-list li').forEach((item) => {
                if (!item.classList.contains('completed')) {
                    item.classList.remove('hidden');
                }
                else {
                    item.classList.remove('hidden');
                }
                this.changeColorFilterTodo('_all');
            });
        });
        document.querySelector('#_active').addEventListener('click', () => {
            document.querySelectorAll('.todo-list li').forEach((item) => {
                if (item.classList.contains('completed')) {
                    item.classList.add('hidden');
                }
                else {
                    item.classList.remove('hidden');
                }
                this.changeColorFilterTodo('_active');
            });
        });
    }
    changeColorFilterTodo(id) {
        document.querySelectorAll('.filters li a').forEach((id) => {
            id.addEventListener('click', (event) => {
                if (event.target) {
                    id.classList.add('selected');
                }
            });
            id.classList.remove('selected');
        });
    }
}
const todos = new toDoList();
