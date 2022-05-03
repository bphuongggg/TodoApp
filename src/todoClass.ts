export class toDos{
    private todoInput: string;
    private todoState: boolean;

    constructor(todoInput: string, todoState: boolean){
        this.todoInput = todoInput;
        this.todoState = todoState;
    }
    public getTodoInput(): string{
        return this.todoInput;
    }
    public setTodoInput(value: string): void{
        this.todoInput = value;
    }
    public getState(): boolean{
        return this.todoState;
    }
    public setState(state: boolean): void{
        this.todoState = state;
    }

}