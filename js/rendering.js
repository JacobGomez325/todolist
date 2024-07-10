import { saveTodos } from "./storage.js";
import { EmptyIcon } from "../components/EmptyIcon.js";
import { TrashIcon } from "../components/TrashIcon.js";

function todoTemplate(todo) {
  return `
    <input type="text" title="cliquer ici pour modifier" class="todo-text" value="${todo.text}">
    <select title="changer le statut" class="todo-status">
      <option value="fait" ${todo.status === "fait" ? "selected" : ""}>Fait</option>
      <option value="en attente" ${todo.status === "en attente" ? "selected" : ""}>En attente</option>
      <option value="non fait" ${todo.status === "non fait" ? "selected" : ""}>Non fait</option>
    </select>
    ${TrashIcon}`;
}

/**
 * Rendre la liste des todos en fonction du filtre spécifié.
 *
 * @param {HTMLElement} todoList
 * @param {Array} todos
 * @param {string} [filter='tous'] - Le filtre à appliquer sur les todos. Peut être 'tous', 'fait', 'en attente', ou 'non fait'.
 */
export function renderTodos(todoList, todos, filter = "tous") {
  todoList.innerHTML = "";

  const filteredTodos = todos.filter((todo) => {
    if (filter === "fait") return todo.status === filter;
    if (filter === "en attente") return todo.status === filter;
    if (filter === "non fait") return todo.status === filter;
    return true;
  });

  if (filteredTodos.length > 0) {
    filteredTodos.forEach((todo) => {
      const li = document.createElement("li");
      li.className = "todo-item";
      li.draggable = true;
      li.dataset.id = todo.id;

      // Edition du contenu de la todo
      li.innerHTML = todoTemplate(todo);

      // Evénements liés à la todo
      li.querySelector(".todo-status").addEventListener("change", (e) => {
        const todoIndex = todos.findIndex(item => item.id === todo.id);
        todos[todoIndex].status = e.target.value;
        saveTodos(todos);
        renderTodos(todoList, todos, filter);
      });

      li.querySelector(".todo-text").addEventListener("change", (e) => {
        const todoIndex = todos.findIndex(item => item.id === todo.id);
        todos[todoIndex].text = e.target.value;
        saveTodos(todos);
        renderTodos(todoList, todos, filter);
      });

      li.querySelector(".delete-todo").addEventListener("click", () => {
        const todoIndex = todos.findIndex(item => item.id === todo.id);
        todos.splice(todoIndex, 1); 
        saveTodos(todos);
        renderTodos(todoList, todos, filter);
      });

      todoList.appendChild(li);
    });
  } else {
    todoList.innerHTML = EmptyIcon;
  }
}
