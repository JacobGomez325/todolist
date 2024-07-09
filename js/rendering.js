import { saveTodos } from "./storage.js";
import { EmptyIcon } from "../components/EmptyIcon.js";
import { TrashIcon } from "../components/TrashIcon.js";

function todoTemplate(todo,index) {
  return `
    <input type="text" title="cliquer ici pour modifier" class="todo-text" value="${
      todo.text
    }">
    <select title="changer le statut" class="todo-status">
      <<option value="fait" ${
        todo.status === "fait" ? "selected" : ""
      }>Fait</option>
      <option value="en attente" ${
        todo.status === "en attente" ? "selected" : ""
      }>En attente</option>
      <option value="non fait" ${
        todo.status === "non fait" ? "selected" : ""
      }>Non fait</option>
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

  const todoFilterLists = todos.filter((todo) => {
    if (filter === "fait") return todo.status === filter;
    if (filter === "en attente") return todo.status === filter;
    if (filter === "non fait") return todo.status === filter;
    return true;
  });

  if (todoFilterLists.length > 0) {
    todoFilterLists.forEach((todo, index) => {
      const li = document.createElement("li");
      li.className = "todo-item";
      li.draggable = true;
      li.dataset.index = index;
      // edition du contenu de ma todo
      li.innerHTML = todoTemplate(todo);

      // evenement lié à la todo
      li.querySelector(".todo-status").addEventListener("change", (e) => {
        todos[index].status = e.target.value;

        saveTodos(todos);
        renderTodos(todoList, todos, filter);
      });

     
      li.querySelector(".todo-text").addEventListener("change", (e) => {
        todos[index].text = e.target.value;
        saveTodos(todos);
        renderTodos(todoList, todos, filter);
      });

      li.querySelector(".delete-todo").addEventListener("click", () => {
        todos.splice(index, 1);
        saveTodos(todos);
        renderTodos(todoList, todos, filter);
      });
      todoList.appendChild(li);
    });
  } else {
    todoList.innerHTML = EmptyIcon;
  }
}
