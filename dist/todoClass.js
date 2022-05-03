export class toDos {
    constructor(todoInput, todoState) {
        this.todoInput = todoInput;
        this.todoState = todoState;
    }
    getTodoInput() {
        return this.todoInput;
    }
    setTodoInput(value) {
        this.todoInput = value;
    }
    getState() {
        return this.todoState;
    }
    setState(state) {
        this.todoState = state;
    }
}
