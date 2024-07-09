export function loadTodos() {
  return JSON.parse(localStorage.getItem("todos")) || [];
}

export function saveTodos(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
}

export function downloadTodosAsCsv(todos) {
  const csvContent =
    "data:text/csv;charset=utf-8," +`INTITULE; STATUT \n` +
    todos.map((todo) => `${todo.text};${todo.status}`).join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "todos.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
