import TodoView from "./TodoView.js";

document.addEventListener("DOMContentLoaded", ()=>{
    TodoView.setApp();
    TodoView.createTodos(TodoView.allTodos)
})