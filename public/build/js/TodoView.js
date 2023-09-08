import Storage from "./Storage.js";

// selecting
const todoFrom = document.querySelector("#todo-form");
const todoTitle = document.querySelector("#todo-input");
const filterBtns = document.querySelectorAll(".filters");
const todoListContainer = document.querySelector("#todo-list__container");
const editTodoModal = document.querySelector("#modal-edit");
const backDrop = document.querySelector("#backdrop");
const editInput = document.querySelector("#edit-input");
const editForm = document.querySelector("#edit-form");


class TodoView{
    constructor(){
        //events
        todoFrom.addEventListener("submit", (e)=> this.addNewTodo(e));
        filterBtns.forEach(btn => btn.addEventListener("click", (e)=> {
            this.filterTodos(e)
            //remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove("active"))
            //add active class to clicked button
            btn.classList.add("active")
        }));
        backDrop.addEventListener("click", this.closeEditModal);
        editForm.addEventListener("submit", (e)=> this.saveEditedTodo(e));
        this.allTodos = [];
    }

    addNewTodo(e){
        e.preventDefault();
        const title = todoTitle.value;
        if(!title) return;
        const newTodo = {
            id: new Date().getTime(),
            createdAt: new Date().toISOString(),
            title,
            isCompleted: false,
            isStared: false,
        };
        Storage.saveTodo(newTodo);
        this.allTodos = Storage.getAllTodos();
        this.createTodos(this.allTodos);
        todoTitle.value = "";
        this.filterTodos()
    }
    setApp(){
        this.allTodos = Storage.getAllTodos();
    }
    createTodos(todos){
        let result="";
        todos.forEach(todo => {
            result += `
            <div class="bg-indigo-900 hover:bg-indigo-800 transition-all duration-400 ease-out p-2 rounded-xl relative mb-5">
            <div class="flex justify-between"> 
                <!-- check and text -->
                <div class="flex items-center justify-start gap-x-3 mb-2">
                    <label><input type="checkbox" name="check-todo" id=""  data-todo-id=${todo.id} class="check-btn bg-indigo-400 p-2 text-indigo-500 focus:ring-indigo-800"></label>
                    <p class="text-indigo-100 text-sm md:text-md lg:text-lg ${todo.isCompleted ? "completed" : ""}">${todo.title}</p>
                </div>
                <!-- star -->
                <button data-todo-id=${todo.id} class="star-btn text-indigo-500 mb-4 transition-all duration-400 ease-in-out">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" 
                        class="w-6 h-6 pointer-events-none ${todo.isStared ? "activeStar" : ""}">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                    </svg>  
                </button>                                            
               
            </div>

            <!-- buttom part -->
            <div class="flex items-center justify-center gap-x-1">
                <div class="flex items-center gap-x-1 bg-indigo-700 p-1 rounded-lg">
                    <span class="">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 star-icon">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                        </svg>                                           
                    </span>
                    <span class="text-indigo-300 text-sm">${new Date(todo.createdAt).toLocaleDateString("fa-IR")}</span>
                </div>
                |
                <button data-todo-id=${todo.id} class="edit-btn flex items-center bg-indigo-700 p-2 rounded-lg hover:bg-indigo-600 transition-all duration-400 ease-out">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="pointer-events-none w-4 h-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>                          
                </button>
                <button data-todo-id = ${todo.id} class="delete-btn  flex items-center bg-indigo-700 p-2 rounded-lg hover:bg-red-900 transition-all duration-500 ease-out">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="pointer-events-none w-4 h-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                    </svg>                          
                </button>
            </div>         
        </div>
        `
        });
        todoListContainer.innerHTML = result;
        const deleteBtns = document.querySelectorAll(".delete-btn");
        deleteBtns.forEach(btn => btn.addEventListener("click", (e)=> this.deleteTodo(e)))
        const checkBtns = document.querySelectorAll(".check-btn")
        checkBtns.forEach(btn => btn.addEventListener("change", (e)=> this.checkTodo(e)))
        const editBtns = document.querySelectorAll(".edit-btn");
        editBtns.forEach(btn => btn.addEventListener("click", (e)=> this.editModalOpen(e)))
        const starBtns = document.querySelectorAll(".star-btn");
        starBtns.forEach(btn => btn.addEventListener("click", (e)=> this.staredTodo(e)))
        // this.filterTodos();
    }
    deleteTodo(e){
        const todoId = Number(e.target.dataset.todoId);
        Storage.deleteTodo(todoId);
        this.allTodos = Storage.getAllTodos();
        this.createTodos(this.allTodos);
    }
    checkTodo(e){
        const todoId = Number(e.target.dataset.todoId)
        this.allTodos = Storage.getAllTodos();
        const todo = this.allTodos.find(t => t.id === todoId)
        todo.isCompleted = !todo.isCompleted
        // e.target.checked = !e.target.checked
        Storage.saveAllTodos(this.allTodos)
        this.createTodos(this.allTodos)
        // this.filterTodos(e)
    }
    filterTodos(e){
        e.preventDefault()
        this.allTodos = Storage.getAllTodos()
        const filterBtnValue = e.target.value
        if(filterBtnValue == "all"){
            this.createTodos(this.allTodos)
            // e.target.classList.add("active")
        }else if (filterBtnValue == "completed"){
            const filteredTodos = this.allTodos.filter(t => t.isCompleted);
            this.createTodos(filteredTodos)
        }else{
            const filteredTodos = this.allTodos.filter(t => !t.isCompleted)
            this.createTodos(filteredTodos)
        }
    }
    editModalOpen(e){
        e.preventDefault()
        editTodoModal.classList.remove("hidden")
        backDrop.classList.remove("hidden")
        this.allTodos = Storage.getAllTodos()
        const todoId = Number(e.target.dataset.todoId)
        const todoToEdit = this.allTodos.find(t => t.id == todoId)
        editInput.value = todoToEdit.title
        editForm.id = todoId

    }
    saveEditedTodo(e){
        e.preventDefault()
        const editTodoId = e.target.id;
        this.allTodos = Storage.getAllTodos()
        const todo = this.allTodos.find(t => t.id == editTodoId)
        todo.title = editInput.value
        Storage.saveAllTodos(this.allTodos)
        this.createTodos(this.allTodos)
        // this.filterTodos(e)
        this.closeEditModal()
    }

    staredTodo(e){
        const todoId = Number(e.target.dataset.todoId)
        this.allTodos = Storage.getAllTodos();
        const todo = this.allTodos.find(t => t.id === todoId)
        console.log(todo)
        todo.isStared = !todo.isStared
        Storage.saveAllTodos(this.allTodos)
        this.createTodos(this.allTodos)
        // console.log(e.target);
    }
    closeEditModal(){
        editTodoModal.classList.add("hidden")
        backDrop.classList.add("hidden")
    }
}
export default new TodoView();