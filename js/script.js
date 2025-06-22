// ELEMENTOS DEL DOM
const menu = document.getElementById("hamburguer");
const links = document.getElementById("nav-links-mobile");
const navBar = document.getElementById("nav-bar");
const navLinks = document.getElementById("nav-links");
const formTask = document.getElementById("task-form");
const deleteCompletedBtn = document.getElementById("delete-completed-btn");
const countSpan = document.getElementById("count-tasks");
const searchInput = document.getElementById("search-task");

// Botones del menú
const allTaskBtns = document.querySelectorAll(".allTask");
const todayTaskBtns = document.querySelectorAll(".todayTask");
const importantTaskBtns = document.querySelectorAll(".importantTask");
const completeTaskBtns = document.querySelectorAll(".completeTask");
const modeTaskBtns = document.querySelectorAll(".modeTask");

// Estado inicial
navLinks.style.display = "none";

// LOCAL STORAGE
const getTasks = () => JSON.parse(localStorage.getItem("tasks")) || [];
const setTasks = (tasks) =>
  localStorage.setItem("tasks", JSON.stringify(tasks));

// FUNCIONES PRINCIPALES
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
  let filteredTasks = getTasks();

  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      const taskCard = checkbox.closest(".task-todo");
      const taskId = Number(taskCard.dataset.id);

      taskCard.remove();
      filteredTasks = filteredTasks.filter((task) => task.id !== taskId);
    }
  });

  setTasks(filteredTasks);
  updateTaskCounter();
};

const updateTaskCounter = () => {
  const activeTasks = getTasks().filter((task) => !task.complete);
  countSpan.textContent = activeTasks.length;
};

// FILTRO DE TAREAS
const filterTasks = (searchText) => {
  const filtered = getTasks().filter((task) =>
    task.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const taskList = document.querySelector("#task-list");
  taskList.innerHTML = "";

  if (filtered.length === 0) {
    taskList.innerHTML = `<p class="no-results">No se encontraron tareas con ese nombre.</p>`;
  } else {
    filtered.forEach(createCardTodo);
  }
};

// FECHA MÍNIMA HOY
const mindate = () => {
  const dateMin = new Date().toLocaleDateString("en-CA");
  document.getElementById("date").setAttribute("min", dateMin);
};

// TOGGLE MENÚ LATERAL
const showSideBar = () => {
  const isHidden = links.style.display === "none";
  links.style.display = isHidden ? "flex" : "none";
  navLinks.style.display = isHidden ? "none" : "flex";
};

// OCULTAR MENÚ EXPANDIDO AL HACER CLIC FUERA
document.addEventListener("click", (e) => {
  const isClickInsideNav = navBar.contains(e.target);
  const isExpanded = navLinks.style.display === "flex";

  if (!isClickInsideNav && isExpanded) {
    navLinks.style.display = "none";
    links.style.display = "flex";
  }
});

// CREAR TAREA EN DOM
const createCardTodo = ({
  id,
  title,
  importance,
  dificulty,
  description,
  date,
  complete,
}) => {
  const taskList = document.querySelector("#task-list");

  const todoAdd = document.createElement("div");
  todoAdd.setAttribute("class", "task-todo");
  todoAdd.dataset.id = id;

  todoAdd.innerHTML = `
    <div class="check-list-todo">
      <input type="checkbox" class="task-checkbox" ${complete ? "checked" : ""}>
      <h3>${title}</h3>
    </div>
    <p>Descripcion: ${description}</p>
    <p>Fecha: ${date}</p>
    <p>Importancia: ${importance}</p>
    <p>Dificultad: ${dificulty}</p>
    <button class="buttons button-delete-task">Eliminar tarea</button>
  `;

  taskList.appendChild(todoAdd);

  // Eliminar individual
  const deleteBtn = todoAdd.querySelector(".button-delete-task");
  deleteBtn.addEventListener("click", () => {
    const currentTasks = getTasks();
    const filteredTask = currentTasks.filter((task) => task.id !== id);
    setTasks(filteredTask);
    todoAdd.remove();
    updateTaskCounter();
  });

  // Marcar como completada
  const checkbox = todoAdd.querySelector(".task-checkbox");
  checkbox.addEventListener("change", (e) => {
    const updatedTasks = getTasks().map((task) =>
      task.id === id ? { ...task, complete: e.target.checked } : task
    );
    setTasks(updatedTasks);
  });
};

// EVENTOS
document.addEventListener("DOMContentLoaded", () => {
  mindate();
  reloadTasks();
  updateTaskCounter();
});

menu.addEventListener("click", (e) => {
  e.stopPropagation();
  showSideBar();
});

searchInput.addEventListener("input", (e) => {
  const text = e.target.value.trim();
  filterTasks(text);
});

deleteCompletedBtn.addEventListener("click", deleteCompletedTasks);

formTask.addEventListener("submit", (event) => {
  event.preventDefault();

  const {
    titleTodo,
    descriptionTodo,
    date,
    selectedLevelImportance,
    selectedLevelDificulty,
  } = formTask.elements;

  const taskDetails = {
    id: Date.now(),
    title: titleTodo.value,
    description: descriptionTodo.value || "Sin descripción",
    date: date.value || "Sin fecha",
    importance: selectedLevelImportance.value,
    dificulty: selectedLevelDificulty.value,
    complete: false,
  };

  createCardTodo(taskDetails);
  saveTask(taskDetails);
  updateTaskCounter();
  formTask.reset();
});

// FILTROS DEL MENÚ
allTaskBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector("#task-list").innerHTML = "";
    reloadTasks();
    updateTaskCounter();
  });
});

todayTaskBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const today = new Date().toLocaleDateString("en-CA");
    const todayTasks = getTasks().filter((task) => task.date === today);

    document.querySelector("#task-list").innerHTML = "";
    todayTasks.forEach(createCardTodo);
    updateTaskCounter();
  });
});

importantTaskBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const importantTasks = getTasks().filter(
      (task) => task.importance === "Alto"
    );

    document.querySelector("#task-list").innerHTML = "";
    importantTasks.forEach(createCardTodo);
    updateTaskCounter();
  });
});

completeTaskBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const completedTasks = getTasks().filter((task) => task.complete);

    document.querySelector("#task-list").innerHTML = "";
    completedTasks.forEach(createCardTodo);
    updateTaskCounter();
  });
});

// MODO OSCURO
if (localStorage.getItem("darkMode") === "true") {
  document.body.classList.add("dark-mode");
  modeTaskBtns.forEach((btn) => {
    const spanIcon = btn.querySelector("span");
    if (spanIcon) spanIcon.textContent = "toggle_on";
  });
}

modeTaskBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    const isDarkMode = document.body.classList.contains("dark-mode");
    localStorage.setItem("darkMode", isDarkMode);

    const spanIcon = btn.querySelector("span");
    if (spanIcon) {
      spanIcon.textContent = isDarkMode ? "toggle_on" : "toggle_off";
    }
  });
});
