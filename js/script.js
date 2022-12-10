
class todo {
    constructor(text, isDone) {
        this.text = text;
        this.isDone = isDone;
    }
}
let TodoObjects = []



let ToDotext = document.querySelector("#todotext")
let addTodoBtn = document.querySelector("#inputsubmit")
let todosDiv = document.querySelector(".Todos")


addTodoBtn.addEventListener("click", function (event) {


    event.preventDefault()
    let todoDiv = document.createElement("div")
    todoDiv.classList.add("todo")

    let checkbox = document.createElement("input")
    checkbox.setAttribute("type", "checkbox")
    checkbox.setAttribute("id", "checkDone")
    checkbox.checked = false

    let todospan = document.createElement("span")
    todospan.textContent = ToDotext.value;


    let deleteTodo = document.createElement("span")
    deleteTodo.textContent = "x"
    deleteTodo.style.marginLeft = "10px"
    deleteTodo.style.cursor = "pointer"

    todoDiv.appendChild(checkbox)
    todoDiv.appendChild(todospan)
    todoDiv.appendChild(deleteTodo)

    todosDiv.appendChild(todoDiv)


    let todotxt = ToDotext.value
    let istodoDone = checkbox.checked;
    let newTodoObjects = new todo(todotxt, istodoDone);


    TodoObjects.push(newTodoObjects)
    localStorage.setItem("todos", JSON.stringify(TodoObjects))


    deleteTodo.addEventListener("click", function () {
        this.parentElement.remove();
    })


    checkbox.addEventListener("click", function () {
        if (this.checked) {
            let chkbox = this;
            TodoObjects.forEach(function (todo) {
                if (chkbox.nextElementSibling.innerText == todo.text) {
                    todo.isDone = true;
                    checkbox.checked = true;
                }
            })
            localStorage.setItem("todos", JSON.stringify(TodoObjects))
        }
        else {
            let chkbox = this;
            TodoObjects.forEach(function (todo) {
                if (chkbox.nextElementSibling.innerText == todo.text) {
                    todo.isDone = false;
                    checkbox.checked = false;
                }
            })
            localStorage.setItem("todos", JSON.stringify(TodoObjects))
        }
    })
})





window.onload = function () {
    let localStorageTodos = JSON.parse(localStorage.getItem("todos"))

    TodoObjects = localStorageTodos;
    TodoObjects.forEach(function (todo) {
        let todoDiv = document.createElement("div")
        todoDiv.classList.add("todo")

        let checkbox = document.createElement("input")
        checkbox.setAttribute("type", "checkbox")
        checkbox.setAttribute("id", "checkDone")
        checkbox.checked = todo.isDone;

        let todospan = document.createElement("span")
        todospan.textContent = todo.text;


        let deleteTodo = document.createElement("span")
        deleteTodo.textContent = "x"
        deleteTodo.style.marginLeft = "10px"
        deleteTodo.style.cursor = "pointer"

        deleteTodo.addEventListener("click", function () {
            this.parentElement.remove();
            let clickedX = this;
            TodoObjects.forEach(function (todo) {
                if (clickedX.previousElementSibling.innerText == todo.text) {


                    let filtered = TodoObjects.filter(function (todoToDelete) {
                        return todoToDelete != todo;
                    })

                    TodoObjects = filtered;
                    localStorage.setItem("todos", JSON.stringify(TodoObjects))
                }
            })
        })


        checkbox.addEventListener("click", function () {
            if (this.checked) {
                let chkbox = this;
                TodoObjects.forEach(function (todo) {
                    if (chkbox.nextElementSibling.innerText == todo.text) {
                        todo.isDone = true;
                        checkbox.checked = true;
                    }
                })
                localStorage.setItem("todos", JSON.stringify(TodoObjects))
            }
            else {
                let chkbox = this;
                TodoObjects.forEach(function (todo) {
                    if (chkbox.nextElementSibling.innerText == todo.text) {
                        todo.isDone = false;
                        checkbox.checked = false;
                    }
                })
                localStorage.setItem("todos", JSON.stringify(TodoObjects))
            }
        })

        todoDiv.appendChild(checkbox)
        todoDiv.appendChild(todospan)
        todoDiv.appendChild(deleteTodo)
        todosDiv.appendChild(todoDiv)
    })

}