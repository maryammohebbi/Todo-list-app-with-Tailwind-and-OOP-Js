export default class Storage{

    static getAllTodos(){
        const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
        return savedTodos;
    }

    static saveTodo(todo){
        const savedTodos = this.getAllTodos();
        savedTodos.push(todo);
        localStorage.setItem("todos", JSON.stringify(savedTodos));
        return savedTodos;
    }

    static deleteTodo(id){
        const allTodos = this.getAllTodos();
        const filteredTodos = allTodos.filter(t => t.id !== id);
        localStorage.setItem("todos", JSON.stringify(filteredTodos))
    }

    static saveAllTodos(todos){
        localStorage.setItem("todos", JSON.stringify(todos))
    }
}