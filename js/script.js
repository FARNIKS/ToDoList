const menu = document.getElementById("hamburguer");
const links = document.getElementById("nav-links-mobile");
const navBar = document.getElementById("nav-bar");
const navLinks = document.getElementById("nav-links");
const formTask = document.getElementById("task-form");
const deleteCompletedBtn = document.getElementById("delete-completed-btn");
const countSpan = document.getElementById("count-tasks");
const searchInput = document.getElementById("search-task");

const getTasks = () => JSON.parse(localStorage.getItem("tasks")) || [];
const setTasks = (tasks) =>
  localStorage.setItem("tasks", JSON.stringify(tasks));

navLinks.setAttribute("style", "display: none");

const reloadTasks = () => {
  const storedTasks = getTasks();
  storedTasks.forEach(createCardTodo);
};

const saveTask = (taskDetails) => {
  const currentTasks = getTasks();
  currentTasks.push(taskDetails);
  setTasks(currentTasks);
};

const deleteCompletedTasks = () => {
  const checkboxes = document.querySelectorAll(".task-checkbox");
  const currentTasks = getTasks();
  let filteredTasks = currentTasks;

  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      const taskCard = checkbox.closest(".task-todo");
      const taskId = Number(taskCard.dataset.id);
      taskCard.remove(); // Elimina del DOM
      filteredTasks = filteredTasks.filter((task) => task.id !== taskId); // Elimina del storage
    }
  });

  setTasks(filteredTasks);
  updateTaskCounter();
};

searchInput.addEventListener("input", (e) => {
  const text = e.target.value.trim();
  filterTasks(text);
});

deleteCompletedBtn.addEventListener("click", deleteCompletedTasks);

const updateTaskCounter = () => {
  const currentTasks = getTasks();
  const activeTasks = currentTasks.filter((task) => !task.complete);
  countSpan.textContent = activeTasks.length;
};

const filterTasks = (searchText) => {
  const allTasks = getTasks();
  const filtered = allTasks.filter((task) =>
    task.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const taskList = document.querySelector("#task-list");
  taskList.innerHTML = ""; // Limpia el contenedor

  if (filtered.length === 0) {
    taskList.innerHTML = `<p class="no-results">No se encontraron tareas con ese nombre.</p>`;
  } else {
    filtered.forEach(createCardTodo);
  }
};

const mindate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  const dateMin = `${year}-${month}-${day}`;

  const dateInput = document.getElementById("date");
  dateInput.setAttribute("min", dateMin);
};

const showSideBar = () => {
  if (links.getAttribute("style") === "display: none") {
    links.setAttribute("style", "display: flex; ");
    navLinks.setAttribute("style", "display: none;");
    console.log("links si");
  } else {
    links.setAttribute("style", "display: none");
    navLinks.setAttribute("style", "display: flex; ");
    console.log("links no");
  }
};

menu.addEventListener("click", (e) => {
  showSideBar();
});

document
  .getElementById("task-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Evita recargar la página

    const {
      titleTodo,
      descriptionTodo,
      date,
      selectedLevelImportance,
      selectedLevelDificulty,
    } = formTask.elements;

    const taskDetails = {
      id: Date.now(), // ID único basado en milisegundos actuales
      title: titleTodo.value,
      description: descriptionTodo.value || "Sin descripción",
      date: date.value || "Sin fecha",
      importance: selectedLevelImportance.value,
      dificulty: selectedLevelDificulty.value,
      complete: false,
    };

    createCardTodo(taskDetails); // pemnsar donde poner la funcion
    saveTask(taskDetails);
    updateTaskCounter();
  });

const createCardTodo = ({
  id,
  title,
  importance,
  dificulty,
  description,
  date,
  complete,
}) => {
  const todoAdd = document.createElement("div");
  const taskList = document.querySelector("#task-list");

  todoAdd.innerHTML = `<div class="check-list-todo">
      <input type="checkbox" class="task-checkbox" ${complete ? "checked" : ""}>
      <h3>${title}</h3>
      </div>
      <p>Descripcion: ${description}</p> 
      <p>Fecha: ${date}</p> 
      <p>Importancia: ${importance}</p> 
      <p>Dificultad: ${dificulty}</p>
      <button class="buttons button-delete-task">Eliminar tarea</button>`;

  todoAdd.setAttribute("class", "task-todo");
  todoAdd.dataset.id = id;
  taskList.appendChild(todoAdd);

  // Evento para eliminar tarea
  const deleteBtn = todoAdd.querySelector(".button-delete-task");
  deleteBtn.addEventListener("click", () => {
    const currentTasks = getTasks();
    const filteredTask = currentTasks.filter((task) => task.id !== id);
    setTasks(filteredTask);
    todoAdd.remove();
    updateTaskCounter();
  });

  // Evento para marcar tarea como completada
  const checkbox = todoAdd.querySelector(".task-checkbox");
  checkbox.addEventListener("change", (e) => {
    const currentTasks = getTasks();
    const updatedTasks = currentTasks.map((task) =>
      task.id === id ? { ...task, complete: e.target.checked } : task
    );
    setTasks(updatedTasks);
  });
};

document.addEventListener("DOMContentLoaded", () => {
  mindate();
  reloadTasks();
  updateTaskCounter();
});
