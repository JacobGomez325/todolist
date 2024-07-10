import { loadTodos, saveTodos,downloadTodosAsCsv } from "./storage.js";
import { handleDragStart,handleDragOver,handleDrop,handleDragEnd } from "./drapAndDrop.js";
import { renderTodos } from "./rendering.js";


// initialisation des elements de  base
const todoInput = document.getElementById("todo-input");
const addTodoBtn = document.getElementById("add-todo");
const filterTodos = document.getElementById("filter-todos");
export const todoList = document.getElementById("todo-list");
const downloadCsvBtn = document.getElementById("download-csv");

//  mes todos list
export const todos = loadTodos();

function generateUniqueId() {
  return 'todo-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
}

function addTodo() {
  const text = todoInput.value.trim();
  if (text) {
    todos.push({id:generateUniqueId(), text, status: "en attente" });
    saveTodos(todos);
    renderTodos(todoList, todos, filterTodos.value);
    todoInput.value = "";
  }
}

addTodoBtn.addEventListener("click", addTodo);
todoInput.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    addTodo();
  }
});

filterTodos.addEventListener("change", () => {
  renderTodos(todoList, todos, filterTodos.value);
});

downloadCsvBtn.addEventListener("click", () => {
  downloadTodosAsCsv(todos);
});

todoList.addEventListener('dragstart', handleDragStart);
todoList.addEventListener('dragover', handleDragOver);
todoList.addEventListener('drop', handleDrop);
todoList.addEventListener('dragend', handleDragEnd);


renderTodos(todoList, todos,filterTodos.value);

