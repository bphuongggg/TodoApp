import { toDos } from './todoClass.js';

class toDoList {
  
  private listTodo: toDos[] = [];
  private todoList: HTMLUListElement = document.querySelector('ul');
 
  private todoCount = <HTMLElement>document.querySelector('.todo-count strong');

  constructor() {
    this.loadForm();
    this.loadData();
  }

  public loadData(): void {
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

  public loadForm(): void {
    let valInput = <HTMLInputElement>document.getElementById('new-todo');
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
  
  public setCountTodo(number): void {
    this.todoCount.innerHTML = +this.todoCount.innerHTML + number;
  }

  public createNewTodoElement(todoInput: string, todoState: boolean): void {
    var todoElement = document.createElement('li');
    var todoView = document.createElement('div');
    var todoCheck = document.createElement('input');
    var todoLabel = document.createElement('label');
    var todoDelete = document.createElement('button');
    var todoEdit = document.createElement('input');

    todoView.className = 'view';
    todoCheck.className = 'toggle';
    todoCheck.type = 'checkbox';
    todoCheck.addEventListener('click', (event: MouseEvent): void => {

      this.changeStateForTodo((event.target as HTMLTextAreaElement).closest('li'));
      var checkInput = event.target as HTMLInputElement;
      var completedInput = (event.target as HTMLTextAreaElement).parentElement;

      if (checkInput.checked == true) {
        completedInput.parentElement.classList.add('completed');
        this.setCountTodo(-1);
      } else {
        completedInput.parentElement.classList.remove('completed');
        this.setCountTodo(1);
      }
    });
    if (todoState) {
      todoCheck.setAttribute('checked', 'checked');
      todoElement.classList.add('completed');
    }
    todoDelete.className = 'destroy';
    todoDelete.addEventListener('click', (event: MouseEvent): void => {
      var todoRemove: HTMLLIElement = (event.target as HTMLTextAreaElement).closest('li');
      this.removeTodo(todoRemove);
      todoRemove.remove();
      if (
        !(event.target as HTMLTextAreaElement).parentElement.parentElement.classList.contains(
          'completed'
        )
      )
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

  public saveTodo(): void {
    localStorage.setItem('todoList', JSON.stringify(this.listTodo));
  }

  public getIndexInTodo(element: HTMLElement): number {
    var node: Element[] = Array.from(element.closest('ul').children);
    var index: number = node.indexOf(element);
    return index;
  }

  public getStateTodo(element: HTMLElement): boolean {
    return (<HTMLInputElement>element.querySelector("input[type='checkbox']")).checked;
  }

  public checkIfTodoIsCompleted(): boolean {
    return true;
  }

  public changeStateForTodo(element: HTMLElement): void {
    var state: boolean = this.getStateTodo(element);
    var index: number = this.getIndexInTodo(element);
    this.listTodo[index].setState(state);
    this.saveTodo();
  }

  public addNewTodoForList(todoInput: string, todoState: boolean): void {
    this.listTodo.push(new toDos(todoInput, todoState));
    this.saveTodo();
  }

  public removeTodo(element: HTMLElement): void {
    for (let i: number = 0; i < this.listTodo.length; i++) {
      this.listTodo.splice(this.getIndexInTodo(element), 1);
      break;
    }
    this.saveTodo();
  }

  public clearCompleted(): void {
    document.querySelector('.clear-completed').addEventListener('click', (event) => {
      let delCompleted: NodeListOf<Element> = document.querySelectorAll('.completed');
      delCompleted.forEach((item) => {
        this.listTodo.splice(this.getIndexInTodo(<HTMLLIElement>item), 1);
        item.remove();
      });
      this.saveTodo();
    });
  }

  public filterForTodo(): void {
    document.querySelector('#_completed').addEventListener('click', () => {
      document.querySelectorAll('.todo-list li').forEach((item) => {
        if (!item.classList.contains('completed')) {
          item.classList.add('hidden');
        } else {
          item.classList.remove('hidden');
        }
        this.changeColorFilterTodo('_completed');
      });
    });
    document.querySelector('#_all').addEventListener('click', () => {
      document.querySelectorAll('.todo-list li').forEach((item) => {
        if (!item.classList.contains('completed')) {
          item.classList.remove('hidden');
        } else {
          item.classList.remove('hidden');
        }
        this.changeColorFilterTodo('_all');
      });
    });

    document.querySelector('#_active').addEventListener('click', () => {
      document.querySelectorAll('.todo-list li').forEach((item) => {
        if (item.classList.contains('completed')) {
          item.classList.add('hidden');
        } else {
          item.classList.remove('hidden');
        }
        this.changeColorFilterTodo('_active');
      });
    });
  }
  public changeColorFilterTodo(id: string): void {
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
