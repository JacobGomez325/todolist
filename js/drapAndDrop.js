import { todos,todoList } from "./main.js";
import { saveTodos } from "./storage.js";
let dragStartClient;
let dragItem;

/**
 * Déclenché lorsque le glissement commence
 * @param {DragEvent} e 
 */
export function handleDragStart(e) {
    e.target.style.opacity = '0.5';
    dragItem = e.target;
    dragStartClient = e.clientY;
}

/**
 * Déclenché lorsque l'élément est survolé par l'élément glissé
 * @param {DragEvent} e 
 */
export function handleDragOver(e) {
    e.preventDefault();
}

/**
 * Déclenché lorsque l'élément est lâché
 * @param {DragEvent} e 
 */
export function handleDrop(e) {
  const target = e.target;
  // Vérifier si on dépose l'élément au tout début
  if (target === dragItem.parentNode.firstChild && dragStartClient > e.clientY) {
    target.parentNode.insertBefore(dragItem, target);
  }
  // Vérifier si on dépose l'élément à la toute fin
  else if (target === dragItem.parentNode.lastChild && dragStartClient < e.clientY) {
    target.parentNode.appendChild(dragItem);
  }
  // Comportement par défaut pour les autres cas
  else if (dragStartClient > e.clientY) {
    target.parentNode.insertBefore(dragItem, target);
  } else {
    target.parentNode.insertBefore(dragItem, target.nextSibling);
  }
  updateTodoDatasets()
  dragItem = undefined;
}

/**
 * Déclenché lorsque le glissement se termine
 * @param {DragEvent} e 
 */
export function handleDragEnd(e) {
  e.target.style.opacity = 1;
}


function updateTodoDatasets() {
  const newOrder = [...todoList.querySelectorAll('.todo-item')].map(item => todos[item.dataset.index]);
  saveTodos(newOrder); 
}

